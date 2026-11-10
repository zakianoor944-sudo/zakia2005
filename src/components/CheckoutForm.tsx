import { useState, type FormEvent } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { placeOrder, type CheckoutDetails } from '@/lib/orders';
import type { CartItem } from '@/types';

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

type FieldErrors = Partial<Record<keyof CheckoutDetails, string>>;

const PHONE_PATTERN = /^\+?[0-9\u09E6-\u09EF\s-]{6,20}$/;

function validate(details: CheckoutDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (details.customerName.trim().length < 2) errors.customerName = 'আপনার নাম লিখুন';
  if (!PHONE_PATTERN.test(details.phone.trim())) errors.phone = 'সঠিক মোবাইল নম্বর লিখুন';
  if (details.address.trim().length < 5) errors.address = 'সম্পূর্ণ ঠিকানা লিখুন';
  return errors;
}

export default function CheckoutForm({ items, onBack, onSuccess }: CheckoutFormProps) {
  const [details, setDetails] = useState<CheckoutDetails>({
    customerName: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateField = (field: keyof CheckoutDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldErrors = validate(details);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      await placeOrder(
        {
          customerName: details.customerName.trim(),
          phone: details.phone.trim(),
          address: details.address.trim(),
          note: details.note.trim(),
        },
        items
      );
      onSuccess();
    } catch {
      setSubmitError('অর্ডার পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="customerName" className="mb-2 block text-sm font-medium text-neutral-800">
          আপনার নাম
        </label>
        <input
          id="customerName"
          type="text"
          autoComplete="name"
          value={details.customerName}
          onChange={(e) => updateField('customerName', e.target.value)}
          className="field"
          placeholder="পূর্ণ নাম লিখুন"
        />
        {errors.customerName && <p className="mt-2 text-sm text-error-600">{errors.customerName}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-800">
          মোবাইল নম্বর
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={details.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="field"
          placeholder="০১XXXXXXXXX"
        />
        {errors.phone && <p className="mt-2 text-sm text-error-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="mb-2 block text-sm font-medium text-neutral-800">
          সম্পূর্ণ ঠিকানা
        </label>
        <textarea
          id="address"
          rows={3}
          autoComplete="street-address"
          value={details.address}
          onChange={(e) => updateField('address', e.target.value)}
          className="field resize-none"
          placeholder="বাসা, রাস্তা, এলাকা ও জেলা"
        />
        {errors.address && <p className="mt-2 text-sm text-error-600">{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="note" className="mb-2 block text-sm font-medium text-neutral-800">
          বিশেষ নির্দেশনা <span className="font-normal text-neutral-500">(ঐচ্ছিক)</span>
        </label>
        <textarea
          id="note"
          rows={2}
          value={details.note}
          onChange={(e) => updateField('note', e.target.value)}
          className="field resize-none"
          placeholder="ডেলিভারির সময় বা অন্য কোনো তথ্য"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-3 rounded-xl bg-error-50 p-4 text-sm text-error-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row">
        <button type="button" onClick={onBack} disabled={submitting} className="btn-outline">
          ফিরে যান
        </button>
        <button type="submit" disabled={submitting} className="btn-primary flex-1">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? 'পাঠানো হচ্ছে...' : 'অর্ডার নিশ্চিত করুন'}
        </button>
      </div>
    </form>
  );
}

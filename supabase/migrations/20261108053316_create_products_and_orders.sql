/*
# Create products and orders for ZN Gallary storefront

1. New Tables
- `products`: skin care products shown on the website.
  - `id` (uuid, primary key)
  - `slug` (text, unique) short stable key
  - `name` (text) product name in Bangla
  - `tagline` (text) short line under the name
  - `description` (text) longer description
  - `size` (text) e.g. 30 ml
  - `price` (integer) price in taka
  - `image_url` (text) product photo
  - `sort_order` (integer) display order
  - `is_active` (boolean) hides products from the site when false
  - `created_at` (timestamptz)
- `orders`: orders placed by customers from the checkout form.
  - `id` (uuid, primary key)
  - `customer_name`, `phone`, `address`, `note`
  - `items` (jsonb) list of ordered products with quantities
  - `total` (integer) total in taka
  - `status` (text) defaults to 'pending'
  - `created_at` (timestamptz)

2. Security
- RLS enabled on both tables.
- Visitors (anon and signed-in) can read only active products.
- Visitors can place orders by inserting a row. They cannot read, change, or delete orders, which protects customer details.
- Orders insert policy checks basic sizes so malformed submissions are rejected.

3. Important notes
- No sign-in exists in this app, so policies apply to the anon role.
- Orders are viewed from the database dashboard for now.
- Seed products are editable placeholders and can be changed in the products table.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  size text NOT NULL DEFAULT '',
  price integer NOT NULL CHECK (price >= 0),
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  note text NOT NULL DEFAULT '',
  items jsonb NOT NULL,
  total integer NOT NULL CHECK (total >= 0),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON products TO anon, authenticated;
GRANT INSERT ON orders TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_active_products" ON products;
CREATE POLICY "public_read_active_products" ON products FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_place_orders" ON orders;
CREATE POLICY "public_place_orders" ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(customer_name) BETWEEN 2 AND 120
    AND char_length(phone) BETWEEN 6 AND 30
    AND char_length(address) BETWEEN 5 AND 500
    AND char_length(note) <= 500
    AND jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) BETWEEN 1 AND 50
    AND total >= 0
    AND status = 'pending'
  );

CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order);

INSERT INTO products (slug, name, tagline, description, size, price, image_url, sort_order)
VALUES
  ('vitamin-c-serum', 'ভিটামিন সি সিরাম', 'উজ্জ্বল ও সমান ত্বকের জন্য', 'প্রতিদিনের ব্যবহারে ত্বকের ম্লানভাব কমাতে সাহায্য করে এবং ত্বককে স্বাভাবিক উজ্জ্বলতা দেয়। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '30 ml', 1200, 'https://images.pexels.com/photos/6847878/pexels-photo-6847878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
  ('hydrating-face-cream', 'হাইড্রেটিং ফেস ক্রিম', 'দীর্ঘক্ষণ আর্দ্রতা ধরে রাখে', 'শুষ্ক ও টানটান ত্বকে গভীর আর্দ্রতা দেয় এবং সারাদিন কোমল অনুভূতি বজায় রাখে। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '50 g', 950, 'https://images.pexels.com/photos/4857799/pexels-photo-4857799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2),
  ('gentle-cleanser', 'জেন্টল ফেস ওয়াশ', 'প্রতিদিনের কোমল পরিষ্কার', 'ত্বকের প্রাকৃতিক তেল ঠিক রেখে ময়লা ও অতিরিক্ত তেল পরিষ্কার করে। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '100 ml', 650, 'https://images.pexels.com/photos/8148742/pexels-photo-8148742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 3),
  ('night-repair-cream', 'নাইট রিপেয়ার ক্রিম', 'রাতে ত্বকের পুনরুজ্জীবন', 'ঘুমানোর আগে ব্যবহারের জন্য তৈরি, ত্বককে পুষ্টি দিয়ে সকালে সতেজ অনুভূতি আনে। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '50 g', 1450, 'https://images.pexels.com/photos/8490112/pexels-photo-8490112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 4),
  ('rose-hydro-mist', 'রোজ হাইড্রো মিস্ট', 'দিনের যেকোনো সময় সতেজতা', 'গোলাপ নির্যাসসমৃদ্ধ মিস্ট যা মেকআপের ওপর বা দিনের মাঝেও ত্বককে সতেজ রাখে। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '100 ml', 550, 'https://images.pexels.com/photos/4841239/pexels-photo-4841239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 5),
  ('daily-sunscreen', 'ডেইলি সান প্রটেকশন', 'প্রতিদিনের রোদ থেকে সুরক্ষা', 'হালকা টেক্সচারের সানস্ক্রিন যা রোদে ত্বককে রক্ষা করে এবং সাদা দাগ ছাড়া সহজে মেশে। [এখানে আপনার পণ্যের আসল বিবরণ লিখুন]', '50 ml', 800, 'https://images.pexels.com/photos/4841327/pexels-photo-4841327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 6)
ON CONFLICT (slug) DO NOTHING;

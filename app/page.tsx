// import { createBrowserClient } from "@/supabase/client";
import { createClient } from "@/supabase/client";
import Card from "@/components/card";

export const revalidate = 3600;

export default async function Home() {
  const supabase = createClient();

  const {data: topProducts,  error: topProductsError} = await supabase.from("easysell-products").select().eq('boost', true);

  const {data: products,  error} = await supabase.from("easysell-products").select();


  console.log(products);

  if (!products) {
    return <p>Loading...</p>;
  }

  if (!topProducts) {
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen mx-auto max-w-[100rem]">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
              {topProducts.map((product) => (
                <Card key={`${product.name}-${product.id}`} {...product} 
                //imageUrl={`${product.imageUrl}`}
                imageUrl={product.imageUrl.startsWith('https') ? product.imageUrl : `${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
                />
              ))}
              

          </div>
        </div>

        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={`${product.name}-${product.id}`} {...product} 
              //imageUrl={`${product.imageUrl}`}
              imageUrl={product.imageUrl.startsWith('https') ? product.imageUrl : `${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
      
    </main>
  );
}

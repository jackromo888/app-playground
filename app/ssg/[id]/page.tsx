import { RenderingInfo } from '#/ui/RenderingInfo';

export async function generateStaticParams() {
  // Generate two pages at build time and the rest on-demand
  return [{ id: '1' }, { id: '2' }];
}

async function fetchData(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params?: any }) {
  const data = await fetchData(params.id);

  const isOnDemand = Number(params.id) > 2;

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {data.title}
        </h1>
        <p className="font-medium text-gray-500 line-clamp-3">{data.body}</p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type={isOnDemand ? 'ssgod' : 'ssg'} />
      </div>
    </div>
  );
}

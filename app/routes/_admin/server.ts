import { json, type LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathSegment = url.pathname.split('/')[0] + '/' + url.pathname.split('/')[1];

  return json({ pathSegment });
};

export const shouldRevalidate = () => {
  return true;
};

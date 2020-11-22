import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const DEBUG = false;

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  const parsedUrl = new URL(event.request.url);
  if (parsedUrl.pathname !== '/' && parsedUrl.pathname.endsWith('/')) {
    parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);
    return Response.redirect(parsedUrl.toString(), 301);
  }

  let options = {};
  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      };
    }

    return await getAssetFromKV(event).catch(() =>
      getAssetFromKV(event, {
        ...options,
        mapRequestToAsset: mapJekyllPaths(),
      }),
    );
  } catch (e) {
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: (req) =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        });
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}

function mapJekyllPaths() {
  return (request) => {
    const parsedUrl = new URL(request.url);
    parsedUrl.pathname = parsedUrl.pathname.concat('.html');
    return new Request(parsedUrl.toString(), request);
  };
}

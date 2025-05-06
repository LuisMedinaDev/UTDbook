export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const key = url.pathname.slice(1); // Remueve la primera barra
  
      const object = await env.R2_BUCKET.get(key);
  
      if (object === null) {
        return new Response('404 Not Found', { status: 404 });
      }
  
      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        },
      });
    },
  };
  
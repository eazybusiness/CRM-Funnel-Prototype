import { useEffect } from 'react';
import Head from 'next/head';

export default function TrackingPixel({ 
  facebookPixelId, 
  googleAnalyticsId, 
  customEvents = [] 
}) {
  useEffect(() => {
    // Facebook Pixel
    if (facebookPixelId) {
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', facebookPixelId);
      window.fbq('track', 'PageView');
      
      // Track custom events
      customEvents.forEach(event => {
        window.fbq('track', event.name, event.data);
      });
    }

    // Google Analytics
    if (googleAnalyticsId) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', googleAnalyticsId);
      
      // Track custom events
      customEvents.forEach(event => {
        gtag('event', event.name, event.data);
      });
    }

    // Custom tracking for funnel steps
    const trackFunnelStep = (step, data = {}) => {
      const trackingData = {
        funnel_step: step,
        timestamp: new Date().toISOString(),
        ...data
      };

      // Send to your own tracking endpoint
      fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData)
      }).catch(err => console.log('Tracking error:', err));

      // Trigger social media events
      if (window.fbq) {
        window.fbq('trackCustom', 'FunnelStep', trackingData);
      }
      
      if (window.gtag) {
        window.gtag('event', 'funnel_step', trackingData);
      }
    };

    // Make tracking function globally available
    window.trackFunnelStep = trackFunnelStep;

  }, [facebookPixelId, googleAnalyticsId, customEvents]);

  return (
    <Head>
      {facebookPixelId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${facebookPixelId}');
                fbq('track', 'PageView');
              `
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
      
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `
            }}
          />
        </>
      )}
    </Head>
  );
}

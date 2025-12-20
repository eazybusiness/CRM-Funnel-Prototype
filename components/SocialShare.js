import { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Share2,
  Copy,
  Check
} from 'lucide-react';

export default function SocialShare({ 
  url, 
  title, 
  description, 
  utmSource = 'social_share' 
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;
  
  // Add UTM parameters for tracking
  const trackedUrl = `${shareUrl}?utm_source=${utmSource}&utm_medium=social&utm_campaign=funnel_share`;

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackedUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
      color: 'bg-pink-600 hover:bg-pink-700',
      action: 'copy'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${trackedUrl}`)}`,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const handleShare = async (link) => {
    if (link.action === 'copy') {
      await navigator.clipboard.writeText(trackedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(link.url, '_blank', 'width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: trackedUrl,
        });
      } catch (err) {
        console.log('Native share failed:', err);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Teilen:</span>
      </div>
      
      <div className="flex space-x-3">
        {socialLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleShare(link)}
            className={`
              ${link.color} text-white p-3 rounded-full 
              transform transition-all duration-200 hover:scale-110 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
            title={`Auf ${link.name} teilen`}
          >
            {link.action === 'copy' && copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <link.icon className="w-5 h-5" />
            )}
          </button>
        ))}
        
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            title="Teilen"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {copied && (
        <div className="text-sm text-green-600 flex items-center">
          <Check className="w-4 h-4 mr-1" />
          Link kopiert!
        </div>
      )}
    </div>
  );
}

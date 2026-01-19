import { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  MessageCircle,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function SocialCTA({ 
  variant = 'default',
  customText = null 
}) {
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/yourprofile',
      username: '@yourprofile',
      color: 'from-pink-500 to-purple-600',
      action: 'profile'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/yourprofile',
      username: 'Your Business Name',
      color: 'from-blue-500 to-blue-700',
      action: 'profile'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/49123456789?text=Ich%20interessiere%20mich%20für%20Ihre%20Angebote',
      username: '+49 123 456789',
      color: 'from-green-500 to-green-600',
      action: 'contact'
    }
  ];

  const handleSocialClick = (social) => {
    // Track social media click
    if (typeof window !== 'undefined' && window.trackFunnelStep) {
      window.trackFunnelStep('social_click', {
        platform: social.name.toLowerCase(),
        action: social.action,
        url: social.url
      });
    }

    if (social.action === 'copy') {
      navigator.clipboard.writeText(social.username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(social.url, '_blank');
    }
  };

  const getCTAText = () => {
    if (customText) return customText;
    
    switch (variant) {
      case 'urgent':
        return '🔥 Nur noch heute: Sichere dir deinen Vorteil!';
      case 'community':
        return '👥 Tritt unserer Community von 10.000+ Erfolgreichen bei';
      case 'exclusive':
        return '⭐ Exklusive Angebote nur für Social Media Follower';
      default:
        return '🚀 Folge uns für tägliche Erfolgstipps';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {getCTAText()}
        </h3>
        <p className="text-gray-600">
          Erhalte exklusive Inhalte, Rabatte und Erfolgsgeschichten direkt in deinem Feed.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {socialLinks.map((social) => (
          <button
            key={social.name}
            onClick={() => handleSocialClick(social)}
            className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <social.icon className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="font-bold text-gray-900 mb-2">{social.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{social.username}</p>
              
              <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700">
                <span>
                  {social.action === 'contact' ? 'Jetzt chatten' : 'Folgen'}
                </span>
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {copied && (
        <div className="flex items-center justify-center text-green-600 mb-6">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Benutzername kopiert!</span>
        </div>
      )}

      <div className="text-center">
        <div className="inline-flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Aktive Antwortgarantie
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Tägliche Updates
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Exklusive Inhalte
          </span>
        </div>
      </div>

      {/* Social Proof */}
      <div className="mt-8 pt-8 border-t border-purple-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            <strong>Über 10.000+ Erfolgreiche</strong> folgen uns bereits
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
              </div>
            ))}
            <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">+5k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

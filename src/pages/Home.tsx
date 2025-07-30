import { useState } from 'react';
import {
  User,
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Settings,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      icon: <User className="w-5 h-5" />,
      title: 'Employee Portal',
      description: 'Access your leave application dashboard',
      color: 'from-red-600 to-red-400',
      buttonText: 'Go to Portal',
      options: null,
      link: '/employee-login',
    },
    {
      id: 2,
      icon: <Users className="w-5 h-5" />,
      title: 'Admin Panel',
      description: 'Manage organization settings',
      color: 'from-gray-700 to-gray-500',
      buttonText: 'Show Options',
      options: [
        {
          icon: <Briefcase className="w-4 h-4" />,
          label: 'HR Panel',
          link: '/hr-login',
        },
        {
          icon: <Settings className="w-4 h-4" />,
          label: 'Manager Panel',
          link: '/manager-login',
        },
        {
          icon: <Shield className="w-4 h-4" />,
          label: 'Partner Panel',
          link: '/partner-login',
        },
      ],
      link: null,
    },
    {
      id: 3,
      icon: <Users className="w-5 h-5" />,
      title: 'Admin Portal',
      description: 'Access Admin leave application dashboard',
      color: 'from-slate-800 to-slate-600',
      buttonText: 'Go to Portal',
      options: null,

      link: '/hr-manager-login',
    },
  ];

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="w-full p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: card.id * 0.1 }}
              className={`relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${card.color}`}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                    {card.icon}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-white/20"
                  >
                    {card.id === 2 || card.id === 3
                      ? expandedCard === card.id
                        ? 'Admin'
                        : 'Admin'
                      : 'Employee'}
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm mb-6">{card.description}</p>

                {card.link ? (
                  <a href={card.link}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {card.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (card.options ? toggleCard(card.id) : null)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
                      card.id === 2
                        ? 'bg-white/10 hover:bg-white/20'
                        : 'bg-white/20 hover:bg-white/30'
                    } transition-colors`}
                  >
                    <span>{card.buttonText}</span>
                    {card.options ? (
                      expandedCard === card.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </motion.button>
                )}

                <AnimatePresence>
                  {card.options && expandedCard === card.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="space-y-2">
                        {card.options.map((option, index) => (
                          <a
                            href={option.link}
                            key={index}
                            className="w-full flex items-center gap-3 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <motion.button
                              whileHover={{ x: 5 }}
                              className="w-full flex items-center gap-3 px-4 py-2.5"
                            >
                              {option.icon}
                              <span>{option.label}</span>
                            </motion.button>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Glow effect */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full filter blur-3xl -z-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

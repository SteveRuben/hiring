'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de chargement pour démonstration
    setTimeout(() => {
      setIsLoading(false);

      // Redirection vers le dashboard après connexion réussie
      router.push('/dashboard');
    }, 1500);
  };

  // Animation des cubes en arrière-plan
  const AnimatedCubes = () => {
    return (
      <div className="fixed inset-0 -z-10 opacity-30">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 80 + 20; // Entre 20px et 100px
          const xPos = Math.random() * 100; // Position horizontale (%)
          const yPos = Math.random() * 100; // Position verticale (%)
          const duration = Math.random() * 25 + 15; // Durée d'animation entre 15 et 40 secondes
          const delay = Math.random() * 5; // Délai entre 0 et 5 secondes
          const rotate = Math.random() * 360; // Rotation aléatoire

          return (
            <motion.div
              key={index}
              className="absolute rounded-lg bg-primary/10 border border-primary/20"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${yPos}%`,
                transformOrigin: 'center',
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
                rotate: rotate,
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>
    );
  };

  // Effet de rayonnement autour du logo
  const GlowEffect = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-secondary/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-accent relative overflow-hidden p-4">
      <AnimatedCubes />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="w-full max-w-md backdrop-blur-sm bg-background/70 p-8 rounded-xl shadow-xl border border-primary/20 relative z-10"
      >
        <div className="flex flex-col items-center space-y-2 mb-8 relative">
          <GlowEffect />
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            className="relative z-10"
          >
            <Shield className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight">HiringSolution</h1>
          <p className="text-muted-foreground text-center">
            Connectez-vous à votre espace recruteur
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            variants={animationVariants}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="exemple@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4 pr-4 py-6 focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
                initial={{ width: 0 }}
                animate={{ width: email ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={animationVariants}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="#" className="text-xs text-primary hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-4 pr-10 py-6 focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
                initial={{ width: 0 }}
                animate={{ width: password ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={animationVariants}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Se souvenir de moi
            </label>
          </motion.div>

          <motion.div
            variants={animationVariants}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full py-6 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte?{' '}
            <Link href="#" className="text-primary hover:underline">
              Contacter notre équipe
            </Link>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl z-0"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"
        />
      </motion.div>
    </div>
  );
}

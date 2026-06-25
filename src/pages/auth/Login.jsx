import React, { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '../components/common';
import { AuthLayout } from '../components/layout';
import toast from 'react-hot-toast';
import useAuthStore from '../stores/authStore';

/**
 * Page de connexion professionnelle avec dark mode
 */

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success('Connexion réussie!');
      // Rediriger vers le dashboard
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={EnvelopeIcon}
        />

        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={LockClosedIcon}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Connexion en cours...' : 'Se Connecter'}
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Pas de compte?{' '}
          <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Créer un compte
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;

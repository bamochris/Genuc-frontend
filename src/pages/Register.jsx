import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '../components/common';
import { AuthLayout } from '../components/layout';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

/**
 * Page d'enregistrement
 */

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple
    if (!formData.name) setErrors((p) => ({ ...p, name: 'Nom requis' }));
    if (!formData.email) setErrors((p) => ({ ...p, email: 'Email requis' }));
    if (formData.password.length < 8)
      setErrors((p) => ({ ...p, password: 'Min 8 caractères' }));
    if (formData.password !== formData.confirmPassword)
      setErrors((p) => ({ ...p, confirmPassword: 'Les mots de passe ne correspondent pas' }));
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Créer un Compte</h2>

        <Input
          label="Nom Complet"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={UserIcon}
          placeholder="Jean Dupont"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={EnvelopeIcon}
          placeholder="jean@university.edu"
        />

        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={LockClosedIcon}
          placeholder="••••••••"
        />

        <Input
          label="Confirmer le mot de passe"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={LockClosedIcon}
          placeholder="••••••••"
        />

        <Button type="submit" variant="primary" fullWidth className="mt-6">
          Créer un Compte
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Déjà un compte?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Se Connecter
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;

import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AccessTokenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Accès par lien unique</h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez le code d'accès qui vous a été envoyé par email
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                Code d'accès
              </label>
              <div className="mt-1">
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Entrez votre code d'accès"
                />
              </div>
            </div>

            <div>
              <Link
                href="/candidate/dashboard"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Accéder au test
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm">
              <Link
                href="/dashboard/candidate/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Retour à la page de connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

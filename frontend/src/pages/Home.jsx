import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="w-full bg-blue-600 py-6 shadow-md pt-20"> {/* Added pt-20 */}
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-white font-bold">Bienvenue sur Formulaire Storage</h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center mt-8">
          <div className="bg-white shadow-md rounded p-6 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold mb-4">Connectez-vous pour utiliser notre site</h2>
            <p className="text-gray-700 mb-6">
              Notre site permet de stocker et de gérer vos formulaires en toute sécurité. Pour accéder à toutes nos fonctionnalités, vous devez être connecté. Si vous n'avez pas encore de compte, inscrivez-vous dès maintenant !
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full bg-gray-800 py-4">
        <div className="container mx-auto text-center text-white">
          &copy; 2024 Formulaire Storage. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
'use client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ChallengeService } from '@/lib/services/challenge.service';
import { ChallengeStepService } from '@/lib/services/challenge-step.service';
import { Challenge, ChallengeStatus } from '@/model/challenge';

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [stepsCount, setStepsCount] = useState<Record<number, number>>({});
  const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({});

  // Charger les challenges au chargement de la page
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await ChallengeService.getAllChallenges();
        setChallenges(data);
        setFilteredChallenges(data);

        // Récupérer le nombre d'étapes pour chaque challenge
        const stepsCountMap: Record<number, number> = {};
        for (const challenge of data) {
          try {
            const steps = await ChallengeStepService.getStepsByChallenge(challenge.id);
            stepsCountMap[challenge.id] = steps.length;
          } catch (err) {
            console.error(
              `Erreur lors de la récupération des étapes pour le challenge ${challenge.id}:`,
              err
            );
            stepsCountMap[challenge.id] = 0;
          }
        }
        setStepsCount(stepsCountMap);
      } catch (err) {
        console.error('Erreur lors du chargement des challenges:', err);
        setError('Impossible de charger les challenges. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Filtrer les challenges en fonction de la recherche et du filtre de statut
  useEffect(() => {
    let filtered = [...challenges];

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter) {
      filtered = filtered.filter((challenge) => challenge.status === statusFilter);
    }

    setFilteredChallenges(filtered);
  }, [searchTerm, statusFilter, challenges]);

  // Fonction pour supprimer un challenge
  const handleDeleteChallenge = async (challengeId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce challenge?')) {
      try {
        setIsDeleting({ ...isDeleting, [challengeId]: true });
        await ChallengeService.deleteChallenge(challengeId);

        // Mettre à jour la liste après suppression
        setChallenges(challenges.filter((challenge) => challenge.id !== challengeId));
      } catch (err) {
        console.error(`Erreur lors de la suppression du challenge ${challengeId}:`, err);
        alert('Une erreur est survenue lors de la suppression du challenge.');
      } finally {
        setIsDeleting({ ...isDeleting, [challengeId]: false });
      }
    }
  };

  // Fonction pour publier un challenge
  const handlePublishChallenge = async (challengeId: number) => {
    try {
      setIsDeleting({ ...isDeleting, [challengeId]: true }); // Réutiliser l'état de chargement
      const updatedChallenge = await ChallengeService.publishChallenge(challengeId);

      // Mettre à jour la liste après publication
      setChallenges(
        challenges.map((challenge) => (challenge.id === challengeId ? updatedChallenge : challenge))
      );
    } catch (err) {
      console.error(`Erreur lors de la publication du challenge ${challengeId}:`, err);
      alert('Une erreur est survenue lors de la publication du challenge.');
    } finally {
      setIsDeleting({ ...isDeleting, [challengeId]: false });
    }
  };

  // Fonction pour formatter une date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  // Obtenir le statut formaté
  const getStatusLabel = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.DRAFT:
        return 'Brouillon';
      case ChallengeStatus.PUBLISHED:
        return 'Publié';
      case ChallengeStatus.COMPLETED:
        return 'Terminé';
      default:
        return status;
    }
  };

  // Obtenir les classes pour le badge de statut
  const getStatusClasses = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.DRAFT:
        return 'bg-gray-100 text-gray-800';
      case ChallengeStatus.PUBLISHED:
        return 'bg-green-100 text-green-800';
      case ChallengeStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtenir les classes pour le badge de difficulté
  const getDifficultyClasses = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Difficile':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Challenges</h1>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/admin/users" className="text-blue-600 hover:text-blue-800">
                Utilisateurs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Rechercher un challenge..."
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value={ChallengeStatus.DRAFT}>Brouillon</option>
              <option value={ChallengeStatus.PUBLISHED}>Publié</option>
              <option value={ChallengeStatus.COMPLETED}>Terminé</option>
            </select>
          </div>
          <Link
            href="/dashboard/admin/challenges/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Créer un challenge
          </Link>
        </div>

        {/* Challenges table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Chargement des challenges...</div>
          ) : filteredChallenges.length === 0 ? (
            <div className="p-6 text-center">Aucun challenge trouvé</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Étapes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date de création
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChallenges.map((challenge) => (
                  <tr key={challenge.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {challenge.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stepsCount[challenge.id] || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(challenge.status)}`}
                      >
                        {getStatusLabel(challenge.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(challenge.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/admin/challenges/${challenge.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Modifier
                      </Link>
                      {challenge.status === ChallengeStatus.DRAFT && (
                        <button
                          className="text-green-600 hover:text-green-900 mr-4"
                          onClick={() => handlePublishChallenge(challenge.id)}
                          disabled={isDeleting[challenge.id]}
                        >
                          {isDeleting[challenge.id] ? 'Publication...' : 'Publier'}
                        </button>
                      )}
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteChallenge(challenge.id)}
                        disabled={isDeleting[challenge.id]}
                      >
                        {isDeleting[challenge.id] ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Affichage de 1 à {filteredChallenges.length} sur {challenges.length} challenges
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 text-gray-500">
              Précédent
            </button>
            <button className="px-3 py-1 border rounded-md text-sm bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

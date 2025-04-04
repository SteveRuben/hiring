// src/services/challenge.service.ts
import { Challenge, ChallengeDto, ChallengeStatus, ChallengeUpdateDto } from '@/model/challenge';

import api, { extractData } from '../api/api';

/**
 * Service pour gérer les challenges
 */
export const ChallengeService = {
  /**
   * Récupère tous les challenges
   * @returns Promise avec la liste des challenges
   */
  getAllChallenges: async (): Promise<Challenge[]> => {
    try {
      const response = await api.get<Challenge[]>('/challenges');
      return extractData(response);
    } catch (error) {
      console.error('Failed to get all challenges:', error);
      throw error;
    }
  },

  /**
   * Récupère un challenge par son ID
   * @param challengeId - ID du challenge
   * @returns Promise avec les détails du challenge
   */
  getChallengeById: async (challengeId: number): Promise<Challenge | null> => {
    try {
      const response = await api.get<Challenge | null>(`/challenges/${challengeId}`);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to get challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouveau challenge
   * @param challengeData - Données du challenge à créer
   * @returns Promise avec le challenge créé
   */
  createChallenge: async (challengeData: ChallengeDto): Promise<Challenge> => {
    try {
      const response = await api.post<Challenge>('/challenges', challengeData);
      return extractData(response);
    } catch (error) {
      console.error('Failed to create challenge:', error);
      throw error;
    }
  },

  /**
   * Met à jour un challenge existant
   * @param challengeId - ID du challenge à mettre à jour
   * @param updateData - Données à mettre à jour
   * @returns Promise avec le challenge mis à jour
   */
  updateChallenge: async (
    challengeId: number,
    updateData: ChallengeUpdateDto
  ): Promise<Challenge> => {
    try {
      const response = await api.patch<Challenge>(`/challenges/${challengeId}`, updateData);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to update challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un challenge
   * @param challengeId - ID du challenge à supprimer
   * @returns Promise avec le challenge supprimé
   */
  deleteChallenge: async (challengeId: number): Promise<Challenge> => {
    try {
      const response = await api.delete<Challenge>(`/challenges/${challengeId}`);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to delete challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Publie un challenge (change son statut à PUBLISHED)
   * @param challengeId - ID du challenge à publier
   * @returns Promise avec le challenge publié
   */
  publishChallenge: async (challengeId: number): Promise<Challenge> => {
    try {
      const response = await api.patch<Challenge>(`/challenges/${challengeId}/publish`);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to publish challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Filtre les challenges par statut
   * @param status - Statut à filtrer
   * @returns Promise avec la liste des challenges filtrés
   */
  getChallengesByStatus: async (status: ChallengeStatus): Promise<Challenge[]> => {
    try {
      const allChallenges = await ChallengeService.getAllChallenges();
      return allChallenges.filter((challenge) => challenge.status === status);
    } catch (error) {
      console.error(`Failed to filter challenges by status ${status}:`, error);
      throw error;
    }
  },

  /**
   * Récupère les challenges créés par un utilisateur spécifique
   * @param userId - ID de l'utilisateur
   * @returns Promise avec la liste des challenges de l'utilisateur
   */
  getChallengesByOwner: async (userId: number): Promise<Challenge[]> => {
    try {
      const allChallenges = await ChallengeService.getAllChallenges();
      return allChallenges.filter((challenge) => challenge.ownerId === userId);
    } catch (error) {
      console.error(`Failed to get challenges by owner ${userId}:`, error);
      throw error;
    }
  },
};

export default ChallengeService;

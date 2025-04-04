// src/services/challenge-step.service.ts
import {
  ChallengeStep,
  CreateChallengeStepDto,
  UpdateChallengeStepDto,
} from '@/model/challenge-step';

import api, { extractData } from '../api/api';

/**
 * Service pour gérer les étapes des challenges
 */
export const ChallengeStepService = {
  /**
   * Récupère toutes les étapes d'un challenge
   * @param challengeId - ID du challenge
   * @returns Promise avec la liste des étapes
   */
  getStepsByChallenge: async (challengeId: number): Promise<ChallengeStep[]> => {
    try {
      const response = await api.get<ChallengeStep[]>(`/challenges/${challengeId}/steps`);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to get steps for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Récupère une étape spécifique d'un challenge
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @returns Promise avec les détails de l'étape
   */
  getStepById: async (challengeId: number, stepId: number): Promise<ChallengeStep | null> => {
    try {
      const response = await api.get<ChallengeStep | null>(
        `/challenges/${challengeId}/steps/${stepId}`
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to get step ${stepId} for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Crée une nouvelle étape pour un challenge
   * @param challengeId - ID du challenge
   * @param stepData - Données de l'étape à créer
   * @returns Promise avec l'étape créée
   */
  createStep: async (
    challengeId: number,
    stepData: Omit<CreateChallengeStepDto, 'challengeId'>
  ): Promise<ChallengeStep> => {
    try {
      const response = await api.post<ChallengeStep>(`/challenges/${challengeId}/steps`, stepData);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to create step for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Met à jour une étape existante
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape à mettre à jour
   * @param updateData - Données à mettre à jour
   * @returns Promise avec l'étape mise à jour
   */
  updateStep: async (
    challengeId: number,
    stepId: number,
    updateData: UpdateChallengeStepDto
  ): Promise<ChallengeStep> => {
    try {
      const response = await api.patch<ChallengeStep>(
        `/challenges/${challengeId}/steps/${stepId}`,
        updateData
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to update step ${stepId} for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Supprime une étape
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape à supprimer
   * @returns Promise avec le résultat de la suppression
   */
  deleteStep: async (challengeId: number, stepId: number): Promise<any> => {
    try {
      const response = await api.delete<any>(`/challenges/${challengeId}/steps/${stepId}`);
      return extractData(response);
    } catch (error) {
      console.error(`Failed to delete step ${stepId} for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Récupère la prochaine étape disponible pour un challenge
   * @param challengeId - ID du challenge
   * @param currentStepNumber - Numéro de l'étape actuelle
   * @returns Promise avec l'étape suivante ou null si c'est la dernière
   */
  getNextStep: async (
    challengeId: number,
    currentStepNumber: number
  ): Promise<ChallengeStep | null> => {
    try {
      const steps = await ChallengeStepService.getStepsByChallenge(challengeId);
      const nextStep = steps.find((step) => step.stepNumber === currentStepNumber + 1);
      return nextStep || null;
    } catch (error) {
      console.error(`Failed to get next step for challenge ${challengeId}:`, error);
      throw error;
    }
  },

  /**
   * Vérifie si l'étape est la dernière du challenge
   * @param challengeId - ID du challenge
   * @param stepNumber - Numéro de l'étape à vérifier
   * @returns Promise avec un booléen indiquant si c'est la dernière étape
   */
  isLastStep: async (challengeId: number, stepNumber: number): Promise<boolean> => {
    try {
      const steps = await ChallengeStepService.getStepsByChallenge(challengeId);
      const maxStepNumber = Math.max(...steps.map((step) => step.stepNumber));
      return stepNumber === maxStepNumber;
    } catch (error) {
      console.error(`Failed to check if step is last for challenge ${challengeId}:`, error);
      throw error;
    }
  },
};

export default ChallengeStepService;

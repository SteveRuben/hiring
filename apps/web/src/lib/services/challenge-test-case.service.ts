import {
  CreateChallengeTestCaseDto,
  TestCaseChallenge,
  UpdateChallengeTestCaseDto,
} from '@/model/challenge-test-case';

import api, { extractData } from '../api/api';

/**
 * Service pour gérer les cas de test des étapes de challenge
 */
export const ChallengeTestCaseService = {
  /**
   * Récupère tous les cas de test d'une étape
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @returns Promise avec la liste des cas de test
   */
  getAllTestCases: async (challengeId: number, stepId: number): Promise<TestCaseChallenge[]> => {
    try {
      const response = await api.get<TestCaseChallenge[]>(
        `/challenges/${challengeId}/steps/${stepId}/test-case`
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to get test cases for step ${stepId}:`, error);
      throw error;
    }
  },

  /**
   * Récupère un cas de test spécifique
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @param testCaseId - ID du cas de test
   * @returns Promise avec les détails du cas de test
   */
  getTestCaseById: async (
    challengeId: number,
    stepId: number,
    testCaseId: number
  ): Promise<TestCaseChallenge | null> => {
    try {
      const response = await api.get<TestCaseChallenge | null>(
        `/challenges/${challengeId}/steps/${stepId}/test-case/${testCaseId}`
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to get test case ${testCaseId}:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouveau cas de test pour une étape
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @param testCaseData - Données du cas de test à créer
   * @returns Promise avec le cas de test créé
   */
  createTestCase: async (
    challengeId: number,
    stepId: number,
    testCaseData: Omit<CreateChallengeTestCaseDto, 'stepId'>
  ): Promise<TestCaseChallenge> => {
    try {
      const response = await api.post<TestCaseChallenge>(
        `/challenges/${challengeId}/steps/${stepId}/test-case`,
        testCaseData
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to create test case for step ${stepId}:`, error);
      throw error;
    }
  },

  /**
   * Met à jour un cas de test existant
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @param testCaseId - ID du cas de test à mettre à jour
   * @param updateData - Données à mettre à jour
   * @returns Promise avec le cas de test mis à jour
   */
  updateTestCase: async (
    challengeId: number,
    stepId: number,
    testCaseId: number,
    updateData: UpdateChallengeTestCaseDto
  ): Promise<TestCaseChallenge> => {
    try {
      const response = await api.patch<TestCaseChallenge>(
        `/challenges/${challengeId}/steps/${stepId}/test-case/${testCaseId}`,
        updateData
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to update test case ${testCaseId}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un cas de test
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @param testCaseId - ID du cas de test à supprimer
   * @returns Promise avec le résultat de la suppression
   */
  deleteTestCase: async (
    challengeId: number,
    stepId: number,
    testCaseId: number
  ): Promise<TestCaseChallenge> => {
    try {
      const response = await api.delete<TestCaseChallenge>(
        `/challenges/${challengeId}/steps/${stepId}/test-case/${testCaseId}`
      );
      return extractData(response);
    } catch (error) {
      console.error(`Failed to delete test case ${testCaseId}:`, error);
      throw error;
    }
  },

  /**
   * Calcule le score total possible pour une étape
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @returns Promise avec le score total possible
   */
  getTotalPossibleScore: async (challengeId: number, stepId: number): Promise<number> => {
    try {
      const testCases = await ChallengeTestCaseService.getAllTestCases(challengeId, stepId);
      return testCases.reduce((total, testCase) => total + testCase.score, 0);
    } catch (error) {
      console.error(`Failed to calculate total score for step ${stepId}:`, error);
      throw error;
    }
  },

  /**
   * Vérifie si une étape a des cas de test
   * @param challengeId - ID du challenge
   * @param stepId - ID de l'étape
   * @returns Promise avec un booléen indiquant si l'étape a des cas de test
   */
  hasTestCases: async (challengeId: number, stepId: number): Promise<boolean> => {
    try {
      const testCases = await ChallengeTestCaseService.getAllTestCases(challengeId, stepId);
      return testCases.length > 0;
    } catch (error) {
      console.error(`Failed to check if step ${stepId} has test cases:`, error);
      throw error;
    }
  },
};

export default ChallengeTestCaseService;

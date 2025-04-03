import React from 'react';

import { Exercise } from '@/types';

interface ProgressTrackerProps {
  exercises: Exercise[];
  completedExercises: string[];
  currentExerciseId: string;
  // eslint-disable-next-line no-unused-vars
  onExerciseSelect: (exerciseId: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  exercises,
  completedExercises,
  currentExerciseId,
  onExerciseSelect,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">Progression</h3>

      <div className="space-y-2">
        {exercises.map((exercise) => {
          const isCompleted = completedExercises.includes(exercise.id);
          const isCurrent = exercise.id === currentExerciseId;

          return (
            <button
              key={exercise.id}
              onClick={() => onExerciseSelect(exercise.id)}
              className={`w-full p-2 rounded-md text-left flex items-center ${
                isCurrent
                  ? 'bg-blue-100 border-blue-300 border-2'
                  : isCompleted
                    ? 'bg-green-100 border-green-200 border'
                    : 'bg-white border'
              }`}
            >
              <div className="mr-3">{isCompleted ? '✅' : '○'}</div>
              <div>
                <div className="font-medium">{exercise.title}</div>
                <div className="text-sm text-gray-600">
                  Difficulté:{' '}
                  {exercise.difficulty === 'easy'
                    ? 'Facile'
                    : exercise.difficulty === 'medium'
                      ? 'Moyen'
                      : 'Difficile'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Progression: {completedExercises.length}/{exercises.length} exercices complétés
      </div>
    </div>
  );
};

export default ProgressTracker;

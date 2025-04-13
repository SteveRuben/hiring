// import React from 'react';

// import { Exercise } from '@/types';

// import { useTranslation } from '../i18n';

// interface ProgressTrackerProps {
//   exercises: Exercise[];
//   completedExercises: string[];
//   currentExerciseId: string;
//   // eslint-disable-next-line no-unused-vars
//   onExerciseSelect: (exerciseId: string) => void;
// }

// const ProgressTracker: React.FC<ProgressTrackerProps> = ({
//   exercises,
//   completedExercises,
//   currentExerciseId,
//   onExerciseSelect,
// }) => {
//   const { t } = useTranslation();

//   const getDifficultyTranslation = (difficulty: string) => {
//     switch (difficulty) {
//       case 'easy':
//         return t('progressTracker.easy');
//       case 'medium':
//         return t('progressTracker.medium');
//       default:
//         return t('progressTracker.hard');
//     }
//   };
//   return (
//     <div className="p-4 border rounded-lg bg-gray-50">
//       <h3 className="text-lg font-semibold mb-3">{t('progressTracker.title')}</h3>

//       <div className="space-y-2">
//         {exercises.map((exercise) => {
//           const isCompleted = completedExercises.includes(exercise.id);
//           const isCurrent = exercise.id === currentExerciseId;

//           return (
//             <button
//               key={exercise.id}
//               onClick={() => onExerciseSelect(exercise.id)}
//               className={`w-full p-2 rounded-md text-left flex items-center ${
//                 isCurrent
//                   ? 'bg-blue-100 border-blue-300 border-2'
//                   : isCompleted
//                     ? 'bg-green-100 border-green-200 border'
//                     : 'bg-white border'
//               }`}
//             >
//               <div className="mr-3">{isCompleted ? '✅' : '○'}</div>
//               <div>
//                 <div className="font-medium">{exercise.title}</div>
//                 <div className="text-sm text-gray-600">
//                   {t('progressTracker.difficulty')} {getDifficultyTranslation(exercise.difficulty)}
//                 </div>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         {t('progressTracker.progress')} {completedExercises.length}/{exercises.length}{' '}
//         {t('progressTracker.exercisesCompleted')}
//       </div>
//     </div>
//   );
// };

// export default ProgressTracker;

import { AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import React from 'react';

import { Exercise } from '@/types';

import { useTranslation } from '../i18n';

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
  const { t } = useTranslation();

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            {t('progressTracker.easy')}
          </span>
        );
      case 'medium':
        return (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
            {t('progressTracker.medium')}
          </span>
        );
      case 'hard':
        return (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">
            {t('progressTracker.hard')}
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (exerciseId: string, isCurrentExercise: boolean) => {
    const isCompleted = completedExercises.includes(exerciseId);

    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (isCurrentExercise) {
      return <Circle className="h-5 w-5 text-blue-600 fill-blue-100" />;
    } else {
      return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{t('progressTracker.title')}</h3>

      <div className="space-y-3">
        {exercises.map((exercise) => {
          const isCompleted = completedExercises.includes(exercise.id);
          const isCurrent = exercise.id === currentExerciseId;

          return (
            <button
              key={exercise.id}
              onClick={() => onExerciseSelect(exercise.id)}
              className={`w-full p-3 rounded-md text-left flex items-start transition-colors ${
                isCurrent
                  ? 'bg-blue-50 border-blue-200 border'
                  : isCompleted
                    ? 'bg-green-50 border-green-100 border hover:bg-green-100'
                    : 'bg-white border hover:bg-gray-50'
              }`}
            >
              <div className="mr-3 mt-0.5">{getStatusIcon(exercise.id, isCurrent)}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{exercise.title}</div>
                <div className="flex justify-between items-center mt-1">
                  {getDifficultyBadge(exercise.difficulty)}

                  {/* {exercise.timeEstimate && (
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exercise.timeEstimate} min
                    </div>
                  )} */}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-gray-600 flex items-center justify-between">
        <div>
          {t('progressTracker.progress')} {completedExercises.length}/{exercises.length}
        </div>
        <div className="text-xs text-gray-500">
          {Math.round((completedExercises.length / exercises.length) * 100)}%{' '}
          {t('progressTracker.complete')}
        </div>
      </div>

      {exercises.length > 0 && completedExercises.length === exercises.length && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            {t('progressTracker.allCompleted')}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;

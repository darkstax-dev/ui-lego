import { useState } from 'react';
import { Clock, Play, Pause, SkipBack, Calendar } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';

export function TimelineControls() {
  const { mode, setMode, timeContext, setTimeContext } = useTopologyStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToTime = () => {
    const timestamp = selectedDate.getTime();
    setTimeContext(timestamp);
    setMode('history');
  };

  const goLive = () => {
    setTimeContext(0);
    setMode('live');
  };

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors flex items-center gap-2',
          isExpanded 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium">
          {mode === 'live' ? 'Live' : 'History'}
        </span>
      </button>

      {isExpanded && (
        <div className="absolute bottom-12 left-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('live')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2',
                  mode === 'live'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                <Play className="w-4 h-4" />
                Live
              </button>
              <button
                onClick={() => setMode('history')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2',
                  mode === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                <Pause className="w-4 h-4" />
                History
              </button>
            </div>
          </div>

          {mode === 'history' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Time
                </label>
                <input
                  type="datetime-local"
                  value={format(selectedDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToTime}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Go to Time
                </button>
                <button
                  onClick={goLive}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <SkipBack className="w-4 h-4" />
                  Go Live
                </button>
              </div>
              {timeContext > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Viewing: {format(new Date(timeContext), 'PPpp')}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

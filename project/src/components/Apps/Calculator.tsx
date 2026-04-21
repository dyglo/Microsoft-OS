import { useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface CalculatorProps {
  windowId: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export function Calculator({
  windowId,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isScientific, setIsScientific] = useState(false);
  const [memory, setMemory] = useState(0);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      case '%':
        return prev % current;
      case '^':
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (newNumber) return;
    const newDisplay = display.slice(0, -1) || '0';
    setDisplay(newDisplay);
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin((current * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((current * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((current * Math.PI) / 180);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case '1/x':
        result = 1 / current;
        break;
      case 'π':
        setDisplay(Math.PI.toString());
        setNewNumber(true);
        return;
      default:
        result = current;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handleMemory = (action: string) => {
    const current = parseFloat(display);

    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setNewNumber(true);
        break;
      case 'M+':
        setMemory(memory + current);
        break;
      case 'M-':
        setMemory(memory - current);
        break;
    }
  };

  const Button = ({
    children,
    onClick,
    className = '',
    variant = 'default',
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'operation' | 'equals' | 'memory';
  }) => {
    const baseClasses =
      'h-10 font-semibold text-sm rounded transition hover:opacity-80 active:scale-95';
    const variants = {
      default:
        'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
      operation:
        'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400',
      equals:
        'bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400',
      memory:
        'bg-orange-500 text-white hover:bg-orange-600 dark:hover:bg-orange-400 text-xs',
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 text-xs font-semibold">
        <span>{isScientific ? 'Scientific' : 'Standard'} Calculator</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-blue-700 rounded transition"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMaximize}
            className="p-1 hover:bg-blue-700 rounded transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <div className="text-right text-3xl font-mono text-gray-900 dark:text-white truncate">
          {display}
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 space-y-2 overflow-y-auto flex-1">
        <div className="flex gap-2">
          <button
            onClick={() => setIsScientific(!isScientific)}
            className="flex-1 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            {isScientific ? 'Standard' : 'Scientific'}
          </button>
          <Button
            onClick={handleClear}
            variant="operation"
            className="flex-1"
          >
            C
          </Button>
          <Button
            onClick={handleBackspace}
            variant="operation"
            className="flex-1"
          >
            ← Backspace
          </Button>
        </div>

        {isScientific && (
          <>
            <div className="grid grid-cols-4 gap-2">
              <Button onClick={() => handleScientific('sin')} variant="memory">
                sin
              </Button>
              <Button onClick={() => handleScientific('cos')} variant="memory">
                cos
              </Button>
              <Button onClick={() => handleScientific('tan')} variant="memory">
                tan
              </Button>
              <Button onClick={() => handleScientific('π')} variant="memory">
                π
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Button
                onClick={() => handleScientific('log')}
                variant="memory"
              >
                log
              </Button>
              <Button onClick={() => handleScientific('ln')} variant="memory">
                ln
              </Button>
              <Button
                onClick={() => handleScientific('sqrt')}
                variant="memory"
              >
                √
              </Button>
              <Button onClick={() => handleScientific('1/x')} variant="memory">
                1/x
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Button
                onClick={() => handleMemory('MC')}
                variant="memory"
              >
                MC
              </Button>
              <Button
                onClick={() => handleMemory('MR')}
                variant="memory"
              >
                MR
              </Button>
              <Button
                onClick={() => handleMemory('M+')}
                variant="memory"
              >
                M+
              </Button>
              <Button
                onClick={() => handleMemory('M-')}
                variant="memory"
              >
                M-
              </Button>
            </div>
          </>
        )}

        {/* Main Number Pad */}
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => handleNumber('7')}>7</Button>
          <Button onClick={() => handleNumber('8')}>8</Button>
          <Button onClick={() => handleNumber('9')}>9</Button>
          <Button onClick={() => handleOperation('÷')} variant="operation">
            ÷
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => handleNumber('4')}>4</Button>
          <Button onClick={() => handleNumber('5')}>5</Button>
          <Button onClick={() => handleNumber('6')}>6</Button>
          <Button onClick={() => handleOperation('×')} variant="operation">
            ×
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => handleNumber('1')}>1</Button>
          <Button onClick={() => handleNumber('2')}>2</Button>
          <Button onClick={() => handleNumber('3')}>3</Button>
          <Button onClick={() => handleOperation('-')} variant="operation">
            −
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => handleNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={handleDecimal}>.</Button>
          <Button onClick={() => handleOperation('+')} variant="operation">
            +
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleOperation('%')}
            variant="operation"
          >
            %
          </Button>
          <Button
            onClick={() => handleOperation('^')}
            variant="operation"
          >
            x^y
          </Button>
        </div>
        <Button
          onClick={handleEquals}
          variant="equals"
          className="w-full"
        >
          = Equals
        </Button>
      </div>
    </div>
  );
}

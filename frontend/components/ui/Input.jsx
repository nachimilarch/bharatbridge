import { forwardRef } from 'react';

const baseCls = 'w-full px-4 py-2.5 text-sm border rounded-xl transition placeholder-slate-400 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
const normalCls = 'border-slate-200 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]/20 bg-white text-slate-800';
const errorCls  = 'border-red-400 focus:border-red-400 focus:ring-red-200 bg-red-50 text-red-900';

const Input = forwardRef(function Input({
  label,
  error,
  hint,
  required,
  className = '',
  ...props
}, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-slate-600 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`${baseCls} ${error ? errorCls : normalCls} ${className}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
});

export default Input;

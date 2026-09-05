# React Performance & Drag & Drop Demo

A classroom-ready React/Vite project demonstrating:

- useMemo
- useCallback
- React.memo
- Native HTML5 Drag & Drop
- Non-optimized vs optimized rendering

## Run the project

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Classroom demonstration

1. Open the browser DevTools Console.
2. Select "Non-Optimized".
3. Type in the input.
4. Notice:
   - expensive calculation runs
   - child component renders
5. Select "Optimized".
6. Type in the input again.
7. Notice:
   - useMemo prevents the expensive calculation
   - useCallback keeps the function reference stable
   - React.memo prevents the child from rendering unnecessarily
8. Change Count and explain why the optimized child DOES render:
   its `value` prop changed.
9. Demonstrate the Drag & Drop section.

## Key concept

useMemo  -> memoizes a VALUE
useCallback -> memoizes a FUNCTION
React.memo -> memoizes a COMPONENT render

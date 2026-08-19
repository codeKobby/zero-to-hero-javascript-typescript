# Coding Agent Project Prompts - One Per Day

Copy one whole prompt and paste it into your coding agent. Each prompt is uniquely tied to the specific day the user has reached - no grouping, no shuffling.

**How to copy a prompt:** each prompt is plain text from its `## PROMPT FOR DAY xx` heading down to the next `---` divider. Select the whole section and copy it - the code snippets are included. There are no wrapper code fences anymore, so copying can no longer return only the code blocks.

**What the agent must deliver:** a guided builder's guide (documentation), NOT a finished project. The agent walks the user through every milestone; the user does the actual work - typing code, running checks, screenshotting, committing, and deploying. Each prompt's DELIVERABLES section defines this contract.

> 🧭 **Quick navigation**
>
> - Back to the **[Portfolio track](PORTFOLIO_TRACK.md)** to see which prompt matches your progress.
> - Jump straight to a day's prompt:
>   - [Prompt 1 - Day 29](#prompt-for-day-29) · [Prompt 2 - Day 30](#prompt-for-day-30) · [Prompt 3 - Day 41](#prompt-for-day-41) · [Prompt 4 - Day 42](#prompt-for-day-42) · [Prompt 5 - Day 43](#prompt-for-day-43) · [Prompt 6 - Day 44](#prompt-for-day-44) · [Prompt 7 - Day 45](#prompt-for-day-45)

---

## PROMPT FOR DAY 29

# GUIDED BUILDING INSTRUCTIONS - DAY 29

# USER PROGRESS LEVEL:
User has completed Day 29 (The Todo Project): state management, localStorage, CRUD operations, delegation, accessible CRUD.

# MUST INCORPORATE THESE SKILLS (Days 1-29):
- Days 1-12: Variables, data types, operators, control flow (if/switch), loops (for/while), functions with parameters/return, function expressions vs declarations
- Days 13-14: Error handling (try/catch), throw statements, custom error objects, regular expressions
- Days 15-16: Number methods (toFixed, toPrecision, isInteger), string methods (trim, split, replace - immutable), DOM selection/manipulation basics
- Days 17-18: Error handling patterns, class syntax (constructor, methods, properties), class inheritance (extends)
- Days 19-20: Class II - static methods, getters/setters, private fields, abstract concepts
- Days 21-22: JSON.stringify/parse, localStorage API (getItem/setItem/removeItem/clear), sessionStorage
- Days 23-24: Higher-order functions (map/filter/reduce), immutability patterns, pure functions
- Days 25-26: Promise concepts (pending/fulfilled/rejected), async/await syntax, error handling in async functions
- Days 27-28: Async/await vs promise chaining, error boundaries in async operations, fetch API basics

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external data validated; safe DOM APIs
6. History: commits show small working features + at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app (already learned on Day 29)
- ❌ A weather dashboard or app
- ❌ A recipe collection or management app
- ❌ An e-commerce shopping cart
- ❌ A forum or discussion board
- ❌ A country information or details app

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 6-8 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. The first milestone is the smallest slice that reads state and re-renders the UI; each later milestone adds exactly one feature.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-29 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes, 3+ screenshots of different states/views, git history with 6+ small working commits including one bug fix, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. STATE MANAGEMENT PATTERN - Single source of truth from Day 29:
   ```
   // State flow: user action → update state → re-render UI
   const handleInputChange = (event) => {
     const { target } = event;
     setState({ ...state, [target.name]: target.value });
     // Render happens automatically from state
   };
   ```

2. LOCALSTORAGE PERSISTENCE - From Days 21-22:
   ```
   // Storage is a boundary, not a promise
   const STORAGE_KEY = 'todo-data-v1';
   const loadStoredTodos = () => {
     try {
       const raw = localStorage.getItem(STORAGE_KEY);
       return raw ? JSON.parse(raw) : [];
     } catch (e) {
       console.warn('Failed to parse stored data');
       return [];
     }
   };
   const saveTodos = (todos) => {
     try {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
     } catch (e) {
       console.error('Storage full or inaccessible');
     }
   };
   ```

3. PROMISE ERROR BOUNDARY - From Days 25-28:
   ```
   // Try-catch with async/await pattern
   try {
     const response = await fetch('/api/todos');
     if (!response.ok) throw new Error('Network error');
     const data = await response.json();
     setState({ ...state, todos: data, loading: false });
   } catch (error) {
     setState({ ...state, error: error.message, loading: false });
     // Show user-friendly error state
   }
   ```
---

## PROMPT FOR DAY 30

# GUIDED BUILDING INSTRUCTIONS - DAY 30

# USER PROGRESS LEVEL:
User has completed Days 29-30 (Todo + Weather): async/await, fetch API, loading/error/retry patterns.

# MUST INCORPORATE THESE SKILLS (Days 1-30):
- All skills from Day 29, PLUS:
- Days 29: State management, localStorage, CRUD operations, delegation, accessible CRUD
- Day 30: Async boundary, mock API, loading/error/retry states
- The state and boundary pattern from Day 30 JS runtime deep dive
- A Promise that settles deterministically
- Loading, success, and error as one state machine
- Favorites with validated hydration

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading (when relevant), empty, error, success, disabled, and keyboard/focus behavior are deliberate
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app (already completed on Day 29)
- ❌ Another weather dashboard or app (already completed on Day 30, but must not be a clone)
- ❌ A recipe collection or management app
- ❌ An e-commerce shopping cart
- ❌ A forum or discussion board
- ❌ A country information or details app
- ❌ A to-do list with local storage that replicates the Day 29 pattern exactly

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 6-8 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. The first milestone gets a Promise that settles deterministically, then loading/success/error are added as one state machine.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-30 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes, 3+ screenshots showing loading/empty/error/success/disabled, git history with 8+ small working commits (6 from Days 1-29, 2 from Day 30 async patterns) including a documented before/after bug fix, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. ASYNC STATE MACHINE - Loading/error/retry from Day 30:
   ```
   // Loading, success, and error as one state machine
   const [state, setState] = useState({ loading: true, error: null, data: null });
   
   useEffect(() => {
     const loadData = async () => {
       setState({ loading: true, error: null, data: null });
       try {
         const response = await fetch('/api/weather');
         if (!response.ok) throw new Error('Network error');
         const data = await response.json();
         setState({ loading: false, error: null, data });
       } catch (error) {
         setState({ loading: false, error: error.message, data: null });
       }
     };
     loadData();
   }, []);
   
   // Render based on state
   if (state.loading) return <Spinner />;
   if (state.error) return <Error message={state.error} />;
   return <WeatherDisplay data={state.data} />;
   ```

2. FAVORITES HYDRATION - From Day 30 runtime deep dive:
   ```
   // Favorites with validated hydration
   const [favorites, setFavorites] = useState(() => {
     try {
       const stored = localStorage.getItem('weather-favorites');
       return stored ? JSON.parse(stored) : [];
     } catch (e) {
       return [];
     }
   });
   
   // Sync to localStorage on change
   useEffect(() => {
     try {
       localStorage.setItem('weather-favorites', JSON.stringify(favorites));
     } catch (e) {
       console.warn('Failed to save favorites');
     }
   }, [favorites]);
   ```

3. API ERROR HANDLING - From Day 30 JS runtime:
   ```
   // Explicit status and fields, erased at runtime
   const handleApiResponse = (response) => {
     // Runtime check - not just trust the status
     if (response.status === 200) {
       return response.json();
     } else if (response.status === 404) {
       throw new Error('Resource not found');
     } else if (response.status === 500) {
       throw new Error('Internal server error');
     } else {
       throw new Error(`HTTP ${response.status}`);
     }
   };
   
   // TypeScript knows the explicit status fields
   interface WeatherResponse {
     main: { temp: number, humidity: number };
     weather: [{ description: string, icon: string }];
     dt: number; // timestamp
   }
   ```
---

## PROMPT FOR DAY 41

# GUIDED BUILDING INSTRUCTIONS - DAY 41

# USER PROGRESS LEVEL:
User has completed Day 41 (Project Recipe): typed CRUD, validation, search.

# MUST INCORPORATE THESE SKILLS (Days 1-41):
- All skills from Days 1-30, PLUS:
- Day 41: Typed CRUD operations with TypeScript types
- Form validation schemas using TypeScript types
- Search/filter implementations with type-safe results
- React Hook Form integration (if using React)
- Zod or Yup schema validation (or custom type guards)

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app
- ❌ A weather dashboard or app
- ❌ Another recipe collection app that replicates the exact Day 41 pattern
- ❌ An e-commerce shopping cart
- ❌ A forum or discussion board
- ❌ A country information or details app
- ❌ A basic to-do list with local storage

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 8-10 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. The first milestone scaffolds an empty typed project that passes `npm.cmd run check` in strict mode; typed CRUD and form validation come next.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-41 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes in strict mode, 3+ screenshots (form, loading, error, success, empty), git history with 10+ small working commits (6 from Days 1-30, 4 from Days 31-41) including a bug fix with test coverage, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. TYPED CRUD OPERATIONS - From Day 41:
   ```
   // Type-safe CRUD with TypeScript
   interface Recipe {
     id: string;
     title: string;
     ingredients: Ingredient[];
     instructions: string[];
     preparationTime: number;
     servings: number;
   }
   
   type RecipesState = {
     items: Recipe[];
     loading: boolean;
     error: string | null;
   };
   
   // Type-safe creation
   const createRecipe = (recipe: Omit<Recipe, 'id'>): Recipe => {
     const newRecipe: Recipe = {
       id: crypto.randomUUID(),
       ...recipe,
     };
     return newRecipe;
   };
   
   // Type-safe update
   const updateRecipe = (id: string, updates: Partial<Recipe>): void => {
     setRecipes(prev => prev.map(recipe =>
       recipe.id === id ? { ...recipe, ...updates } : recipe
     ));
   };
   ```

2. FORM VALIDATION SCHEMA - From Day 41 typed CRUD:
   ```
   // Zod schema for recipe validation
   const recipeSchema = object({
     title: string().min(1).max(100),
     ingredients: array()
       .of(object({ name: string().min(1), amount: number().positive() })),
     preparationTime: number().int().min(1).max(480),
     servings: number().int().min(1).max(20),
   });
   
   // Safe parse with type narrowing
   const parseRecipe = (data: unknown): Recipe => {
     const result = recipeSchema.safeParse(data);
     if (!result.success) {
       throw new Error(
         result.error.format()._errors.join('. ')
       );
     }
     return result.data;
   };
   ```

3. SEARCH/FILTER IMPLEMENTATION - From Day 41:
   ```
   // Type-safe search and filter
   const useRecipesSearch = (recipes: Recipe[], searchTerm: string) => {
     const [filtered, setFiltered] = useState<Recipe[]>(recipes);
     
     useEffect(() => {
       if (!searchTerm) {
         setFiltered(recipes);
         return;
       }
       const term = searchTerm.toLowerCase();
       setFiltered(recipes.filter(
         recipe => recipe.title.toLowerCase().includes(term) ||
                   recipe.ingredients.some(
                     ing => ing.name.toLowerCase().includes(term)
                   )
       ));
     }, [searchTerm, recipes]);
     
     return filtered;
   };
   ```
---

## PROMPT FOR DAY 42

# GUIDED BUILDING INSTRUCTIONS - DAY 42

# USER PROGRESS LEVEL:
User has completed Day 42 (Project Forum): nested data, posts, likes, event delegation.

# MUST INCORPORATE THESE SKILLS (Days 1-42):
- All skills from Days 1-41, PLUS:
- Day 42: Nested data structures (comments with replies)
- Post liking systems with toggle functionality
- Event delegation patterns (single listener on parent)
- like/unlike toggling with UI state updates
- Data persistence with localStorage or API

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app
- ❌ A weather dashboard or app
- ❌ A recipe collection or management app
- ❌ Another forum/discussion board that replicates the exact Day 42 pattern (nested replies, likes)
- ❌ An e-commerce shopping cart
- ❌ A country information or details app
- ❌ A to-do list with local storage

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 10-12 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. Nested data structures first, then event delegation on a single parent listener, then the like/unlike toggle.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-42 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes in strict mode, 3+ screenshots (threaded discussion, like toggling, empty state), git history with 12+ small working commits (nested data, event delegation, like toggle) including an event-delegation bug fix, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. EVENT DELEGATION PATTERN - From Day 42:
   ```
   // Event delegation: attach single listener to parent, handle children via target check
   const postsList = document.getElementById('posts-list');
   
   postsList.addEventListener('click', (event) => {
     // Determine which element was actually clicked
     const target = event.target;
     const likeButton = target.closest('.like-button');
     const replyToggle = target.closest('.reply-toggle');
     
     if (likeButton) {
       const postId = likeButton.dataset.postId;
       toggleLike(postId);
       
       // Update UI reflectively
       const likeSpan = likeButton.nextElementSibling;
       likeSpan.textContent = 
         parseInt(likeSpan.textContent) + 1;
       likeSpan.setAttribute(
         'aria-label', 
         `Likes: ${parseInt(likeSpan.textContent)}`
       );
     }
     
     if (replyToggle) {
       const replyId = replyToggle.dataset.replyId;
       toggleReply(replyId);
       // Show/hide reply form
     }
   });
   ```

2. NESTED DATA STRUCTURE - Comments with replies:
   ```
   // Data model for threaded discussions
   interface Comment {
     id: string;
     author: string;
     text: string;
     createdAt: Date;
     replies: Comment[]; // Nested replies
     isExpanded: boolean; // UI state for expanding/collapsing
   }
   
   // Render function for threaded comments
   const renderComment = (comment: Comment, depth = 0) => {
     const indent = depth * 20; // 20px per nesting level
     return (
       <div style={{ paddingLeft: indent, marginBottom: '10px' }}>
         <strong>{comment.author}</strong>: {comment.text}
         <button onClick={() => setCommentExpanded(comment.id)}>
           {comment.isExpanded ? 'Collapse' : 'Reply'}
         </button>
         {comment.isExpanded && comment.replies.length > 0 &&
           <div style={{ marginLeft: indent }}>
             {comment.replies.map(renderComment.bind(this, depth + 1))}
           </div>}
       </div>
     );
   };
   ```

3. LIKE TOGGLE WITH STATE SYNC - From Day 42:
   ```
   // Like toggle with localStorage persistence
   const toggleLike = async (postId: string) => {
     try {
       const response = await fetch(`/api/posts/${postId}/like`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' }
       });
       
       if (!response.ok) throw new Error('Like failed');
       
       const data = await response.json();
       
       // Update local state
       setLikes(prev => {
         const updated = prev.map(id =>
           id === postId ? [...id, userId] : id
         );
         return updated;
       });
       
       // Persist to localStorage
       localStorage.setItem(
         'post-likes',
         JSON.stringify(updatedLikes)
       );
     } catch (error) {
       console.error('Like toggle error:', error);
       // Show error to user
     }
   };
   ```
---

## PROMPT FOR DAY 43

# GUIDED BUILDING INSTRUCTIONS - DAY 43

# USER PROGRESS LEVEL:
User has completed Day 43 (Project E-commerce): filtering, sorting, cart as derived state.

# MUST INCORPORATE THESE SKILLS (Days 1-43):
- All skills from Days 1-42, PLUS:
- Day 43: Filtering and sorting derived state
- Cart state management with price calculations
- Inventory tracking and stock management
- Price calculations as derived state (total, average, etc.)
- Debounced search/filter inputs

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app
- ❌ A weather dashboard or app
- ❌ A recipe collection or management app
- ❌ An e-commerce shopping cart that replicates the exact Day 43 pattern (filtering, sorting, derived cart state)
- ❌ A forum or discussion board
- ❌ A country information or details app
- ❌ A basic to-do list with local storage

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 10-12 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. Filtering, then sorting, then derived cart totals/counts/taxes computed on render.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-43 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes in strict mode, 3+ screenshots (filtered list, sorted view, cart totals), git history with 10+ small working commits (filtering, sorting, derived state) including a derived-state bug fix, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. DERIVED CART TOTAL - From Day 43:
   ```
   // Cart total calculation as derived state
   const calculateCartTotal = (items: CartItem[]): number => {
     return items.reduce((total, item) => {
       return total + (item.price * item.quantity);
     }, 0);
   };
   
   // Cart count as derived state
   const calculateCartCount = (items: CartItem[]): number => {
     return items.reduce((count, item) => {
       return count + item.quantity;
     }, 0);
   };
   
   // When item quantity changes, recalculate derived states
   const handleQuantityChange = (itemId: string, newQuantity: number) => {
     setCartItems(prev =>
       prev.map(item =>
         item.id === itemId ? { ...item, quantity: newQuantity } : item
       )
     );
     // Derived states auto-update (memoized or computed on render):
     // - cartTotal = calculateCartTotal(cartItems)
     // - cartCount = calculateCartCount(cartItems)
     // - discountApplied = calculateDiscount(cartItems)
     // - taxAmount = calculateTax(cartItems)
   };
   ```

2. FILTERING AND SORTING - From Day 43:
   ```
   // Debounced search and multi-column sort
   const useProductFilters = (products: Product[]) => {
     const [filters, setFilters] = useState({
       search: '',
       category: 'all',
       sortBy: 'price-low',
       minPrice: 0,
       maxPrice: Infinity
     });
   
     // Debounced search
     const debouncedSearch = useMemo(
       () => debounce((term: string) => setFilters(prev => ({ ...prev, search: term })), 300),
       []
     );
   
     useEffect(() => {
       debouncedSearch(searchTerm);
     }, [searchTerm, debouncedSearch]);
   
     // Sorted and filtered products
     const sortedProducts = useMemo(() => {
       let result = [...products];
   
       // Filter by search term
       if (filters.search) {
         const term = filters.search.toLowerCase();
         result = result.filter(
           p => p.name.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
         );
       }
   
       // Filter by category
       if (filters.category !== 'all') {
         result = result.filter(p => p.category === filters.category);
       }
   
       // Sort
       result.sort((a, b) => {
         if (filters.sortBy === 'price-low') return a.price - b.price;
         if (filters.sortBy === 'price-high') return b.price - a.price;
         if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
         return 0;
       });
   
       return result;
     }, [products, filters]);
   
     return { filteredProducts: sortedProducts, setFilters };
   };
   ```

3. INVENTORY TRACKING - From Day 43:
   ```
   // Stock level management with low-stock alerts
   const useInventory = (items: CartItem[]) => {
     const [lowStockItems, setLowStockItems] = useState<CartItem[]>(());
   
     useEffect(() => {
       setLowStockItems(items.filter(item => item.stock <= item.minStock));
     }, [items]);
   
     const canFulfillOrder = (orderQuantity: number): boolean => {
       const totalAvailable = items.reduce(
         (sum, item) => sum + item.stock,
         0
       );
       return totalAvailable >= orderQuantity;
     };
   
     const decrementStock = (itemId: string, quantity: number) => {
       const item = items.find(i => i.id === itemId);
       if (!item) return false;
       
       if (item.stock >= quantity) {
         setItems(prev =>
           prev.map(i =>
             i.id === itemId ? { ...i, stock: i.stock - quantity } : i
           )
         );
         return true;
       }
       return false;
     };
   
     return { lowStockItems, canFulfillOrder, decrementStock };
   };
   ```
---

## PROMPT FOR DAY 44

# GUIDED BUILDING INSTRUCTIONS - DAY 44

# USER PROGRESS LEVEL:
User has completed Day 44 (Project Countries): runtime data validation, aggregation, comparison.

# MUST INCORPORATE THESE SKILLS (Days 1-44):
- All skills from Days 1-43, PLUS:
- Day 44: Runtime data validation (Zod/Yup or custom)
- Aggregation operations (totals/averages/statistics)
- Comparison operators and statistical analysis
- Data transformation pipelines

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app
- ❌ A weather dashboard or app
- ❌ A recipe collection or management app
- ❌ An e-commerce shopping cart
- ❌ A forum or discussion board
- ❌ A country information app that replicates the exact Day 44 pattern (runtime validation + aggregation)
- ❌ A basic to-do list with local storage

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 10-12 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. Runtime validation of external data first, then aggregation/statistics, then comparison views.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-44 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes in strict mode, 3+ screenshots (validated list, aggregation results, comparison view), git history with 10+ small working commits (validation, aggregation, comparison) including a validation bug fix, the DoD README, and the live deployment URL.

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. RUNTIME VALIDATION PIPELINE - From Day 44:
   ```
   // Schema-based validation before API calls
   const countrySchema = object({
     name: string().min(2).max(100),
     isoCode: string().length(2).regex(/^[A-Z]{2}$/),
     population: number().min(0).max(1000000000),
     area: number().min(0).max(1000000),
     capital: string().min(1).max(100),
     continent: string().oneOf(['africa', 'antartica', 'asia', 'australia', 'europe', 'north-america', 'south-america']),
     cca3: string().length(3).uppercase()
   });
   
   // Validate and transform in one step
   const validateCountries = (data: unknown) => {
     const result = countrySchema.safeParse(data);
     
     if (!result.success) {
       // Show field-specific error messages
       setErrors(result.error.flatten().fieldErrors);
       return;
     }
     
     // Safe to use - types are narrowed
     const safeData = result.data as Country[];
     setLoading(false);
     setData(safeData);
   };
   ```

2. AGGREGATION OPERATIONS - From Day 44:
   ```
   // Calculate statistics from country data
   const calculateStatistics = (countries: Country[]) => {
     const totalPopulation = countries.reduce(
       (sum, country) => sum + country.population,
       0
     );
   
     const averagePopulation = totalPopulation / countries.length;
   
     const totalArea = countries.reduce(
       (sum, country) => sum + country.area,
       0
     );
   
     const landPercentage = countries.reduce(
       (sum, country) => {
         if (country.area > 0) {
           return sum + (country.area / 1000000000); // Convert to million km²
         }
         return sum;
       },
       0
     );
   
     // Continent breakdown
     const continentStats = countries.reduce((acc, country) => {
       const continent = country.continent;
       if (!acc[continent]) {
         acc[continent] = { count: 0, totalPopulation: 0, totalArea: 0 };
       }
       acc[continent].count += 1;
       acc[continent].totalPopulation += country.population;
       acc[continent].totalArea += country.area;
       return acc;
     }, {} as Record<string, { count: number; totalPopulation: number; totalArea: number }>);
   
     return {
       totalPopulation,
       averagePopulation,
       totalArea,
       landPercentage,
       continentStats
     };
   };
   ```

3. COMPARISON OPERATORS - From Day 44:
   ```
   // Country comparison tool
   const useCountryComparison = (selectedCountries: Country[]) => {
     if (selectedCountries.length < 2) {
       return null;
     }
   
     return {
       populationComparison: selectedCountries.map(c => ({
         name: c.name,
         population: c.population,
         percentageOfWorld: (c.population / 8_000_000_000) * 100
       })),
       areaComparison: selectedCountries.map(c => ({
         name: c.name,
         areaSqKm: c.area,
         percentageOfWorld: (c.area / 510_000_000) * 100
       })),
       densityComparison: selectedCountries.map(c => ({
         name: c.name,
         populationDensity: Math.round(c.population / c.area * 100) / 100
       }))
     };
   };
   ```
---

## PROMPT FOR DAY 45

# GUIDED BUILDING INSTRUCTIONS - DAY 45

# USER PROGRESS LEVEL:
User has completed Day 45 (Capstone): problem selection, scope control, shipping and defense.

# MUST INCORPORATE THESE SKILLS (Days 1-45):
- All skills from Days 1-44, PLUS:
- Day 45: Problem selection methodology
- Scope control (feature creep prevention)
- Shipping and deployment workflow
- Defensive coding practices
- Complete project portfolio piece

# PORTFOLIO DEFINITION OF DONE (must all be met):
1. README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps
2. Architecture: pure logic separate from DOM rendering; storage and network boundaries are explicit
3. JS/TS parity: TypeScript version passes npm.cmd run check
4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
5. Safety: external or stored data is validated; user/data text uses safe DOM APIs
6. History: commits show small working features and include at least one bug fix

# UNIQUENESS CONSTRAINTS (project MUST NOT be):
- ❌ Another TODO list app
- ❌ A weather dashboard or app
- ❌ A recipe collection or management app
- ❌ An e-commerce shopping cart
- ❌ A forum or discussion board
- ❌ A country information app
- ❌ Any previous course project clone (Todo, Weather, Recipe, Forum, E-commerce, Countries)

# DELIVERABLES - THE AGENT WRITES A GUIDE, THE USER BUILDS:

The agent does NOT build, deploy, or commit the project. Its ONE deliverable is a guided builder's guide: markdown documentation, written like a tutorial, that walks the user through building the project themselves. The guide must:

- Break the build into 12-15 MILESTONES, each one a small working vertical slice the user types, runs, verifies, and commits before continuing. Start with problem selection and scope control (feature flags), then the smallest vertical slice, then hardening (defensive coding, validation), then shipping and defense.
- Read like guided documentation: for each milestone give the GOAL, the Days 1-45 concepts it exercises, a short WHY it matters, the numbered STEPS the user types, and a CHECK the user runs to prove the milestone works.
- Show patterns, never finished code. The user writes every line. Embed the 2-3 pseudo-code snippets below inside the milestone each belongs to.
- Map each of the 6 Portfolio Definition of Done requirements to the milestone that satisfies it.
- End with a SHIPPING CHECKLIST the user runs themselves: `npm.cmd run check` passes in strict mode, 4+ screenshots covering loading/empty/error/success/disabled, git history with 15+ small working commits tracing the full Day 1-45 journey including a bug fix with test coverage, optional CI/CD (GitHub Actions) and Docker, the comprehensive DoD README, and the live URL (custom domain optional).

# PSEUDO CODE SNIPPETS (agent must include 2-3):
1. DEFENSIVE CODING PATTERN - From Day 45:
   ```
   // Defensive: validate EVERY input, handle EVERY edge case
   const safeParse = (value: unknown, fallback: string = ''): string => {
     if (typeof value === 'string') {
       return value;
     }
     if (value === null || value === undefined) {
       return fallback;
     }
     throw new Error(`Cannot parse ${typeof value} to string`);
   };
   
   // Validate API response structure
   const validateApiResponse = <T>(response: unknown): T => {
     if (!response || typeof response !== 'object') {
       throw new Error('Invalid API response');
     }
     
     // Check required fields
     const typedResponse = response as T & { id: string; timestamp: string };
     if (!typedResponse.id) {
       throw new Error('Missing required field: id');
     }
     if (!typedResponse.timestamp) {
       throw new Error('Missing required field: timestamp');
     }
     
     return typedResponse as T;
   };
   ```

2. SCOPE CONTROL - From Day 45:
   ```
   // Feature flag system for scope management
   const featureFlags = {
     ADVANCED_FILTERING: false,
     DARK_MODE: true,
     EXPORT_TO_CSV: false,
     REALTIME_UPDATES: false,
   };
   
   // Toggle feature flag
   const toggleFeature = (flag: keyof typeof featureFlags) => {
     featureFlags[flag] = !featureFlags[flag];
   };
   
   // Conditional rendering based on features
   const renderUI = () => {
     return (
       <div>
         <h1>Application</h1>
         {/* Only show advanced filtering if enabled */}
         {featureFlags.ADVANCED_FILTERING && <AdvancedFilter />}
         
         {/* Always show dark mode toggle */}
         <button onClick={() => toggleFeature('DARK_MODE')}>
           Dark Mode: {featureFlags.DARK_MODE ? 'On' : 'Off'}
         </button>
         
         {/* Conditionally show export */}
         {featureFlags.EXPORT_TO_CSV && <ExportButton />}
       </div>
     );
   };
   ```

3. COMPLETE SHIPPING WORKFLOW - From Day 45:
   ```
   // Full shipping/deployment pipeline
   const deploymentPipeline = async () => {
     const steps = [
       // Step 1: Run type check
       async () => {
         const { stdout, stderr } = await exec('npm.cmd run check');
         if (stderr?.includes('error')) {
           throw new Error('Type check failed: ' + stderr);
         }
         return true;
       },
       
       // Step 2: Run tests
       async () => {
         const { stdout, stderr } = await exec('npm.cmd test');
         if (stderr?.includes('FAIL')) {
           throw new Error('Tests failed: ' + stderr);
         }
         return true;
       },
       
       // Step 3: Build
       async () => {
         const { stdout, stderr } = await exec('npm.cmd run build');
         if (stderr?.includes('error')) {
           throw new Error('Build failed: ' + stderr);
         }
         return true;
       },
       
       // Step 4: Deploy to production
       async () => {
         // Vercel deployment
         const deployUrl = await vercel.deploy({
           target: 'production',
           name: projectName,
           files: buildFiles,
           teamId: teamId
         });
         return deployUrl;
       }
     ];
   
     // Execute steps in sequence, stopping on first failure
     for (const step of steps) {
       try {
         await step();
       } catch (error) {
         console.error(`Deployment stopped at: ${step.name}`);
         throw error;
       }
     }
     
     return 'Deployment successful';
   };
   ```
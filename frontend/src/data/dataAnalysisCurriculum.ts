import { World, PlacementQuestion } from '../types';

export const dataAnalysisPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-da-1',
    topic: 'Pandas Data Structures',
    question: 'In Python Pandas, what is the fundamental structural difference between a Series and a DataFrame?',
    options: [
      'A Series is a 1-dimensional labeled array, whereas a DataFrame is a 2-dimensional tabular structure with labeled rows and columns',
      'A Series can only hold string data, whereas a DataFrame holds numerical integers',
      'DataFrames are immutable while Series can be mutated freely',
      'Series can only have integer indices, while DataFrames cannot use indices',
    ],
    correctIndex: 0,
  },
  {
    id: 'pq-da-2',
    topic: 'Handling Missing Values',
    question: 'When analyzing a dataset where 3% of numerical income values are missing at random, which approach preserves sample size best without severe distortion?',
    options: [
      'Delete the entire column immediately',
      'Impute missing values using the median or a robust regression imputer',
      'Replace all missing values with 0',
      'Duplicate existing rows until the missing cells disappear',
    ],
    correctIndex: 1,
  },
  {
    id: 'pq-da-3',
    topic: 'SQL Aggregations',
    question: 'In SQL analytics, what is the key difference between the WHERE clause and the HAVING clause?',
    options: [
      'WHERE filters rows before grouping/aggregation; HAVING filters groups after aggregation',
      'WHERE only works with numbers, while HAVING only works with strings',
      'HAVING is executed before WHERE in the query pipeline',
      'There is no difference; they are aliases',
    ],
    correctIndex: 0,
  },
  {
    id: 'pq-da-4',
    topic: 'Statistical Significance',
    question: 'In an A/B test analysis, what does a p-value of 0.02 (with alpha = 0.05) typically signify?',
    options: [
      'There is a 2% chance that the treatment was effective',
      'Assuming the null hypothesis is true, there is a 2% probability of observing a difference this extreme, warranting rejection of the null hypothesis',
      'The conversion rate will improve by exactly 2%',
      'The sample size was 98% too small',
    ],
    correctIndex: 1,
  },
];

export const dataAnalysisCurriculumWorlds: World[] = [
  {
    id: 'world-da-1',
    number: 1,
    title: 'World 1: Tabular Foundations & Data Wrangling',
    shortDesc: 'Pandas DataFrames, Series indexing, missing value imputation, type casting, and filtering.',
    color: 'from-purple-600 to-indigo-700',
    levels: [
      {
        id: 'lvl-da-1-1',
        worldId: 'world-da-1',
        title: 'Level 1: DataFrames, Indexing & Filtering',
        order: 1,
        description: 'Understand 2D tabular structures, boolean masking, and column transformations.',
        sublevels: [
          {
            id: 'sub-da-1-1-1',
            levelId: 'lvl-da-1-1',
            worldId: 'world-da-1',
            title: '1.1 Interactive DataFrame Studio',
            order: 1,
            summary: 'Live experiment filtering high-value customer transactions and inspecting summary metrics.',
            optionalResources: [
              {
                id: 'res-da-1',
                title: 'Official Pandas Documentation: 10 Minutes to pandas',
                type: 'documentation',
                provider: 'Pandas Documentation',
                url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
                isFree: true,
                duration: '12 min read',
              },
              {
                id: 'res-da-2',
                title: 'DataCamp: Pandas Data Ingestion & Boolean Masking',
                type: 'article',
                provider: 'DataCamp Community',
                url: 'https://www.datacamp.com/tutorial/pandas-tutorial-dataframe-python',
                isFree: true,
                duration: '10 min read',
              },
            ],
            activities: [
              {
                id: 'act-da-1-1-1',
                sublevelId: 'sub-da-1-1-1',
                title: 'Interactive Filter & Aggregation Playground',
                type: 'interactive',
                xpReward: 35,
                description: 'Adjust the customer dataset metrics below. Modify the threshold filter to isolate tier-1 accounts ($5,000+ spend) and observe the active segment summary.',
                learningObjectives: [
                  'Understand boolean indexing in Pandas DataFrames',
                  'Calculate active subscriber mean revenue and churn risk',
                ],
                hints: [
                  'Look at the condition: revenue > 5000.',
                  'Ensure high-value tier badges are rendered.',
                ],
                interactiveData: {
                  initialCode: `<!-- Data Analysis Pipeline Preview -->\n<div class="data-preview bg-[#0f172a] text-slate-200 p-5 rounded-2xl font-mono text-xs">\n  <div class="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">\n    <span class="text-purple-400 font-bold"># Active DataFrame: df_customers[df['mrr'] >= 5000]</span>\n    <span class="text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">4 Accounts Filtered</span>\n  </div>\n  <table class="w-full text-left">\n    <thead>\n      <tr class="text-slate-400 border-b border-slate-800">\n        <th class="py-1">Account</th>\n        <th>Tier</th>\n        <th>MRR</th>\n        <th>Health Score</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr class="border-b border-slate-800/60">\n        <td class="py-1.5 text-white font-bold">Apex Cloud Inc</td>\n        <td>Enterprise</td>\n        <td class="text-emerald-400">$8,450</td>\n        <td class="text-purple-300">96 / 100</td>\n      </tr>\n      <tr class="border-b border-slate-800/60">\n        <td class="py-1.5 text-white font-bold">FinTech Global</td>\n        <td>Enterprise</td>\n        <td class="text-emerald-400">$6,200</td>\n        <td class="text-purple-300">91 / 100</td>\n      </tr>\n      <tr>\n        <td class="py-1.5 text-white font-bold">Omni Retail Labs</td>\n        <td>Enterprise</td>\n        <td class="text-emerald-400">$5,800</td>\n        <td class="text-purple-300">88 / 100</td>\n      </tr>\n    </tbody>\n  </table>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Verify enterprise customer records and ensure the table contains at least 3 account rows with MRR values.',
                  solutionHint: 'Keep table headers and account rows populated.',
                  validationRegex: '<table[\\s\\S]*Apex Cloud Inc[\\s\\S]*FinTech Global',
                },
              },
            ],
          },
          {
            id: 'sub-da-1-1-2',
            levelId: 'lvl-da-1-1',
            worldId: 'world-da-1',
            title: '1.2 Data Types & Cleaning Knowledge Check',
            order: 2,
            summary: 'Test your understanding of categorical vs numerical types, null values, and vectorized operations.',
            optionalResources: [
              {
                id: 'res-da-3',
                title: 'Kaggle Learn: Data Cleaning & Missing Values',
                type: 'interactive',
                provider: 'Kaggle',
                url: 'https://www.kaggle.com/learn/data-cleaning',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-1-1-2',
                sublevelId: 'sub-da-1-1-2',
                title: 'Data Cleaning & Types Quiz',
                type: 'quiz',
                xpReward: 40,
                description: 'Select the correct answers for data cleaning and indexing mechanics.',
                learningObjectives: [
                  'Differentiate between .loc (label-based) and .iloc (integer-position-based)',
                  'Identify best practices for type casting dates and categories',
                ],
                hints: [
                  '.loc selects by row and column labels, while .iloc selects by integer index.',
                ],
                quizData: [
                  {
                    id: 'da-q-1',
                    question: 'In Pandas, what is the primary difference between `df.loc[0]` and `df.iloc[0]`?',
                    type: 'single',
                    options: [
                      '`df.loc[0]` selects by index label (which may or may not be the first row), while `df.iloc[0]` strictly selects the first row by integer position',
                      '`df.loc[0]` only accepts string column names, while `df.iloc[0]` only accepts booleans',
                      '`df.iloc` mutates the underlying DataFrame permanently',
                      'They are identical aliases in Python',
                    ],
                    correctAnswerIndices: [0],
                    explanation: '.loc searches index labels. If an index is sorted or re-indexed with dates or IDs, label 0 might not even exist, whereas .iloc always retrieves by 0-based integer position.',
                  },
                  {
                    id: 'da-q-2',
                    question: 'Which of the following methods are effective for reducing memory footprint when processing millions of categorical string columns? (Select all that apply)',
                    type: 'multiple',
                    options: [
                      'Convert object dtype columns to `category` dtype',
                      'Downcast float64 to float32 when extreme precision is not required',
                      'Convert all columns into nested JSON strings',
                      'Use chunksize parameters during `pd.read_csv()`',
                    ],
                    correctAnswerIndices: [0, 1, 3],
                    explanation: 'Converting repetitive strings to category dtype drastically reduces memory by storing an integer lookup table. Downcasting floats and reading in chunks are also standard memory optimizations.',
                  },
                  {
                    id: 'da-q-3',
                    question: 'True or False: Using Python `for` loops to iterate over DataFrame rows (`iterrows()`) is generally much faster than vectorized Pandas operations.',
                    type: 'true_false',
                    options: ['True', 'False'],
                    correctAnswerIndices: [1],
                    explanation: 'False! Vectorized operations execute in optimized C/Cython routines under the hood, running 100x to 1000x faster than Python-level row iteration.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-da-1-2',
        worldId: 'world-da-1',
        title: 'Level 2: Data Imputation & ETL Pipelines',
        order: 2,
        description: 'Fill missing data, reformat date ranges, and handle outlier values.',
        sublevels: [
          {
            id: 'sub-da-1-2-1',
            levelId: 'lvl-da-1-2',
            worldId: 'world-da-1',
            title: '2.1 Fill in the Missing Code: Clean & Impute',
            order: 1,
            summary: 'Complete incomplete Pandas code to drop critical nulls and impute missing numerical metrics.',
            optionalResources: [
              {
                id: 'res-da-4',
                title: 'Pandas User Guide: Working with Missing Data',
                type: 'documentation',
                provider: 'Pandas',
                url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-1-2-1',
                sublevelId: 'sub-da-1-2-1',
                title: 'Pandas Imputation Precision',
                type: 'fill_code',
                xpReward: 45,
                description: 'Fill in the missing method names to drop rows with missing account IDs and impute remaining missing revenue amounts with the column median.',
                learningObjectives: [
                  'Use dropna(subset=[...]) to discard corrupt keys',
                  'Use fillna() with median() for resilient imputation',
                ],
                hints: [
                  'The method to drop rows with NaN values is "dropna".',
                  'The method to replace NaN values with a constant or metric is "fillna".',
                ],
                fillCodeData: {
                  codeSnippet: `# 1. Remove rows missing primary identifier\ndf_clean = df.{{blank_1}}(subset=['user_id'])\n\n# 2. Impute missing transaction amounts with median\nrevenue_median = df_clean['amount'].median()\ndf_clean['amount'] = df_clean['amount'].{{blank_2}}(revenue_median)`,
                  blanks: [
                    {
                      id: 'blank_1',
                      placeholder: 'method to drop nulls (e.g. dropna)',
                      correctAnswer: 'dropna',
                    },
                    {
                      id: 'blank_2',
                      placeholder: 'method to fill nulls (e.g. fillna)',
                      correctAnswer: 'fillna',
                    },
                  ],
                  explanation: 'dropna(subset=...) removes incomplete keys, while fillna(median) replaces missing numeric amounts with a distribution-resilient central tendency.',
                },
              },
            ],
          },
          {
            id: 'sub-da-1-2-2',
            levelId: 'lvl-da-1-2',
            worldId: 'world-da-1',
            title: '2.2 Code Puzzle: ETL Pipeline Sequencing',
            order: 2,
            summary: 'Reorder scrambled data engineering steps into a production-grade data cleansing pipeline.',
            optionalResources: [
              {
                id: 'res-da-5',
                title: 'Data Engineering Fundamentals: Building Resilient ETL Pipelines',
                type: 'article',
                provider: 'Toward Data Science',
                url: 'https://towardsdatascience.com/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-1-2-2',
                sublevelId: 'sub-da-1-2-2',
                title: 'Assemble the Tabular Cleansing Pipeline',
                type: 'code_puzzle',
                xpReward: 50,
                description: 'Arrange these data pipeline steps into the proper sequential order: from raw file reading to parsing dates, imputing missing values, removing outliers, and exporting.',
                learningObjectives: [
                  'Structure ETL pipelines sequentially',
                  'Parse datetimes before time-series aggregations',
                ],
                hints: [
                  'First step is reading the raw CSV file.',
                  'Date parsing and string trimming happen next.',
                  'Imputation and filtering precede final aggregation.',
                ],
                codePuzzleData: {
                  instructions: 'Order the pipeline steps from initial ingestion to verified export:',
                  pieces: [
                    { id: 'p-1', text: 'raw_df = pd.read_csv("enterprise_logs.csv")' },
                    { id: 'p-2', text: 'clean_df = raw_df.drop_duplicates(subset=["session_id"])' },
                    { id: 'p-3', text: 'clean_df["timestamp"] = pd.to_datetime(clean_df["timestamp"], utc=True)' },
                    { id: 'p-4', text: 'clean_df["duration"].fillna(clean_df["duration"].median(), inplace=True)' },
                    { id: 'p-5', text: 'kpi_summary = clean_df.groupby("country")["duration"].mean().reset_index()' },
                    { id: 'p-6', text: 'kpi_summary.to_parquet("kpi_export.parquet", compression="snappy")' },
                  ],
                  correctOrder: ['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6'],
                  explanation: 'Ingestion -> Deduplication -> Type Casting -> Imputation -> Aggregation -> Parquet Storage represents standard industry ETL best practice.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-da-1-3',
        worldId: 'world-da-1',
        title: 'Level 3: Outlier Detection & Anomaly Bug Hunts',
        order: 3,
        description: 'Debug string-concatenated currency values and corrupted aggregations.',
        sublevels: [
          {
            id: 'sub-da-1-3-1',
            levelId: 'lvl-da-1-3',
            worldId: 'world-da-1',
            title: '3.1 Bug Hunt: The Skewed Revenue Calculation',
            order: 1,
            summary: 'Fix a data conversion bug where dollar signs and commas prevented numeric addition.',
            optionalResources: [
              {
                id: 'res-da-6',
                title: 'Real Python: Cleaning Messy Strings in Pandas',
                type: 'documentation',
                provider: 'Real Python',
                url: 'https://realpython.com/python-pandas-tricks/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-1-3-1',
                sublevelId: 'sub-da-1-3-1',
                title: 'Bug Hunt: Rescue the Total Revenue Metric',
                type: 'bug_hunt',
                xpReward: 60,
                description: 'The executive financial report has a critical bug! The revenue column contains string symbols like "$1,200.50". Running `.sum()` causes string concatenation instead of numeric calculation. Strip the "$" and "," and cast to float.',
                learningObjectives: [
                  'Clean formatted currency strings using .str.replace()',
                  'Safely cast object columns to float using .astype(float)',
                ],
                hints: [
                  "Use .str.replace('$', '').str.replace(',', '').",
                  'Apply `.astype(float)` to convert strings into real numbers.',
                ],
                bugHuntData: {
                  starterCode: `<div id="revenue-calc">\n  <!-- BUG: revenue column is treated as strings! -->\n  <p>Raw Values: ["$1,200", "$3,500", "$800"]</p>\n  <code id="clean-script">\n    # Fix: remove '$' and cast to float\n    clean_rev = df['rev'].str.replace('$', '').astype(float)\n    total = clean_rev.sum()\n  </code>\n  <div id="output">Total Calculated: $5,500</div>\n</div>`,
                  brokenDescription: 'Raw strings with currency symbols cause string concatenation or type errors when calculating totals.',
                  expectedBehavior: 'Strip formatting symbols and cast to float to achieve numeric summation.',
                  testFunction: `(code) => {
                    const hasReplace = code.includes(".str.replace") || code.includes("replace");
                    const hasFloat = code.includes("float");
                    if (!hasReplace) return 'Ensure strings are cleaned with .replace().';
                    if (!hasFloat) return 'Ensure the values are cast to float.';
                    return true;
                  }`,
                  hints: [
                    'Include .str.replace and astype(float) in the code.',
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-da-2',
    number: 2,
    title: 'World 2: Exploratory Data Analysis (EDA) & SQL',
    shortDesc: 'Statistical profiling, distributions, correlation analysis, SQL joins, and window functions.',
    color: 'from-blue-600 to-indigo-800',
    levels: [
      {
        id: 'lvl-da-2-1',
        worldId: 'world-da-2',
        title: 'Level 1: Summary Statistics & Distributions',
        order: 1,
        description: 'Mean, median, mode, IQR, standard deviation, and skewness.',
        sublevels: [
          {
            id: 'sub-da-2-1-1',
            levelId: 'lvl-da-2-1',
            worldId: 'world-da-2',
            title: '1.1 Predict the Output: Correlation Matrix',
            order: 1,
            summary: 'Analyze Pearson correlation coefficient outputs between marketing spend and signups.',
            optionalResources: [
              {
                id: 'res-da-7',
                title: 'Khan Academy: Bivariate Numerical Data & Correlation',
                type: 'article',
                provider: 'Khan Academy',
                url: 'https://www.khanacademy.org/math/statistics-probability',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-2-1-1',
                sublevelId: 'sub-da-2-1-1',
                title: 'Predict Correlation & Covariance',
                type: 'predict_output',
                xpReward: 50,
                description: 'Read the Python correlation analysis below. Two variables (ad_spend and conversions) have a strong linear relationship. What is the expected range of the diagonal values in `df.corr()`?',
                learningObjectives: [
                  'Understand that self-correlation along the diagonal is always 1.0',
                  'Recognize positive vs negative linear associations',
                ],
                hints: [
                  'A variable compared with itself always has a perfect correlation of 1.0.',
                ],
                predictOutputData: {
                  codeSnippet: `import pandas as pd\n\ndata = {\n  'ad_spend': [1000, 2000, 3000, 4000],\n  'conversions': [120, 230, 345, 460]\n}\ndf = pd.DataFrame(data)\nprint(round(df['ad_spend'].corr(df['ad_spend']), 1))`,
                  options: [
                    '1.0',
                    '0.5',
                    '0.0',
                    '-1.0',
                  ],
                  correctOptionIndex: 0,
                  executionExplanation: 'The correlation of any variable with itself is always exactly 1.0. The correlation between ad_spend and conversions is also close to +0.999 due to strong linear scaling.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-da-2-2',
        worldId: 'world-da-2',
        title: 'Level 2: Relational SQL Joins & Window Functions',
        order: 2,
        description: 'Multi-table queries, INNER/LEFT joins, and analytic window functions (ROW_NUMBER, RANK).',
        sublevels: [
          {
            id: 'sub-da-2-2-1',
            levelId: 'lvl-da-2-2',
            worldId: 'world-da-2',
            title: '2.1 Build-from-Scratch: Cohort Retention Query',
            order: 1,
            summary: 'Write SQL from scratch using GROUP BY and COUNT(DISTINCT user_id) to calculate user cohorts.',
            optionalResources: [
              {
                id: 'res-da-8',
                title: 'Mode Analytics: Advanced SQL Window Functions Guide',
                type: 'documentation',
                provider: 'Mode Analytics',
                url: 'https://mode.com/sql-tutorial/sql-window-functions/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-2-2-1',
                sublevelId: 'sub-da-2-2-1',
                title: 'Build-from-Scratch: Monthly Revenue Breakdown',
                type: 'build_challenge',
                xpReward: 55,
                description: 'Write the SQL query to calculate total revenue and active customer count per country from the `orders` table. Group by `country` and filter for orders with status = "completed".',
                learningObjectives: [
                  'Use SELECT, SUM(amount), and COUNT(DISTINCT user_id)',
                  'Apply WHERE status = "completed" and GROUP BY country',
                ],
                hints: [
                  'Start with `SELECT country, SUM(amount) AS total_revenue`',
                  'Include `WHERE status = \'completed\'`',
                  'End with `GROUP BY country`',
                ],
                buildChallengeData: {
                  challengePrompt: 'Construct a SQL aggregation query grouping completed orders by country.',
                  starterCode: `-- Write your SQL query below\nSELECT \n  country,\n  SUM(amount) AS total_revenue,\n  COUNT(DISTINCT user_id) AS active_customers\nFROM orders\nWHERE status = 'completed'\nGROUP BY country\nORDER BY total_revenue DESC;`,
                  requirements: [
                    'Include "SELECT"',
                    'Include "SUM(amount)"',
                    'Include "GROUP BY country"',
                  ],
                  testAssertions: [
                    'code.toLowerCase().includes("select")',
                    'code.toLowerCase().includes("sum(amount)")',
                    'code.toLowerCase().includes("group by country")',
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-da-3',
    number: 3,
    title: 'World 3: Visual Analytics & Executive Dashboards',
    shortDesc: 'Plotly charts, data storytelling, KPI formulating, executive dashboards, and World Boss arena.',
    color: 'from-amber-500 to-orange-600',
    levels: [
      {
        id: 'lvl-da-3-1',
        worldId: 'world-da-3',
        title: 'Level 1: Chart Selection & Storytelling',
        order: 1,
        description: 'Choose the optimal chart type for distribution, composition, trend, or correlation.',
        sublevels: [
          {
            id: 'sub-da-3-1-1',
            levelId: 'lvl-da-3-1',
            worldId: 'world-da-3',
            title: '1.1 Data Visualization Best Practices Quiz',
            order: 1,
            summary: 'Test your understanding of visual perception, color accessibility, and avoiding chart junk.',
            optionalResources: [
              {
                id: 'res-da-9',
                title: 'Edward Tufte: Visual Display of Quantitative Information',
                type: 'article',
                provider: 'Data Visualization Society',
                url: 'https://www.datavisualizationsociety.org/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-3-1-1',
                sublevelId: 'sub-da-3-1-1',
                title: 'Executive Chart Selection Quiz',
                type: 'quiz',
                xpReward: 50,
                description: 'Select the optimal visualization approaches for executive presentations.',
                learningObjectives: [
                  'Select line charts for continuous time-series and bar charts for categorical comparisons',
                  'Avoid misleading truncated axes and 3D perspectives',
                ],
                hints: ['Line charts naturally indicate trends over continuous time.'],
                quizData: [
                  {
                    id: 'da-vq-1',
                    question: 'You need to present monthly revenue growth over the past 24 months to executive leadership. Which chart type best conveys this continuous chronological trend?',
                    type: 'single',
                    options: [
                      'A 3D Pie Chart with 24 slices',
                      'A clean 2D Line Chart with clear date intervals along the X-axis',
                      'A Radar spiderweb chart',
                      'A Word Cloud',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Line charts are the gold standard for tracking continuous temporal trends. Pie charts with >5 slices create severe cognitive overload.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-da-3-2',
        worldId: 'world-da-3',
        title: 'Level 2: World Boss Arena',
        order: 2,
        description: 'Comprehensive data synthesis boss battle solving high-stakes customer churn and revenue crises.',
        sublevels: [
          {
            id: 'sub-da-3-2-1',
            levelId: 'lvl-da-3-2',
            worldId: 'world-da-3',
            title: '3.1 Boss Mission: The Churn Crisis Executive Report',
            order: 1,
            summary: 'Formulate accurate KPI formulas to defeat The Data Silo Boss and unlock executive insights.',
            optionalResources: [
              {
                id: 'res-da-10',
                title: 'SaaS Metrics 2.0: A Guide to Churn, LTV, and CAC',
                type: 'article',
                provider: 'For Entrepreneurs',
                url: 'https://www.forentrepreneurs.com/saas-metrics-2/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-3-2-1',
                sublevelId: 'sub-da-3-2-1',
                title: 'Boss Mission: Defeat The Data Silo Overlord',
                type: 'boss_mission',
                xpReward: 150,
                description: 'The Data Silo Overlord is blinding company executives with misleading metrics! Your task is to calculate the genuine Monthly Churn Rate %, formulate the Customer Lifetime Value (LTV) formula, and output actionable executive insights.',
                learningObjectives: [
                  'Compute Churn Rate = (Lost Customers / Starting Customers) * 100',
                  'Formulate Customer Lifetime Value (LTV = ARPU / Churn Rate)',
                  'Synthesize clear executive action recommendations',
                ],
                hints: [
                  'Objective 1: Maintain metric card with id="metric-churn-rate".',
                  'Objective 2: Calculate LTV as ARPU divided by churn rate.',
                  'Objective 3: Provide an actionable recommendation block with class="executive-takeaway".',
                ],
                bossMissionData: {
                  bossName: 'The Data Silo Overlord',
                  bossTitle: 'Guardian of Fragmented Databases',
                  bossHealth: 100,
                  scenarioDescription: 'Unify disparate marketing, product, and billing tables into a single coherent executive dashboard.',
                  starterCode: `<div id="executive-dashboard" class="p-6 bg-[#0f172a] text-white rounded-2xl">\n  <header class="border-b border-slate-800 pb-4 mb-4">\n    <h2 class="text-xl font-bold">Executive SaaS Growth & Retention Audit</h2>\n  </header>\n\n  <!-- Objective 1: Add KPI card with id="metric-churn-rate" -->\n  <div id="metric-churn-rate" class="kpi-card bg-slate-900 p-4 rounded-xl border border-purple-500/30">\n    <span class="text-xs text-slate-400">Monthly Churn Rate</span>\n    <div class="text-2xl font-black text-rose-400">2.4%</div>\n  </div>\n\n  <!-- Objective 2: Add KPI card with id="metric-ltv" -->\n  <div id="metric-ltv" class="kpi-card bg-slate-900 p-4 rounded-xl border border-emerald-500/30 mt-3">\n    <span class="text-xs text-slate-400">Customer Lifetime Value (LTV)</span>\n    <div class="text-2xl font-black text-emerald-400">$6,250</div>\n  </div>\n\n  <!-- Objective 3: Maintain .executive-takeaway block -->\n  <div class="executive-takeaway mt-4 p-4 rounded-xl bg-purple-950/40 border border-purple-800 text-sm">\n    <strong>Actionable Insight:</strong> Expanding onboarding product tours for mid-market accounts will reduce churn by an estimated 0.8%, preserving $420k ARR annually.\n  </div>\n</div>`,
                  objectives: [
                    {
                      id: 'obj-da-1',
                      description: 'Maintain metric card with id="metric-churn-rate"',
                      checkHint: 'Include element with id="metric-churn-rate"',
                    },
                    {
                      id: 'obj-da-2',
                      description: 'Maintain metric card with id="metric-ltv"',
                      checkHint: 'Include element with id="metric-ltv"',
                    },
                    {
                      id: 'obj-da-3',
                      description: 'Include actionable insight with class="executive-takeaway"',
                      checkHint: 'Include class="executive-takeaway"',
                    },
                  ],
                  badgeName: 'Data Silo Slayer',
                  badgeIcon: 'Crown',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-da-4',
    number: 4,
    title: 'World 4: Predictive Modeling & Scikit-Learn',
    shortDesc: 'Feature scaling, train/test split, regression, classification, confusion matrix, and model metrics.',
    color: 'from-emerald-600 to-teal-800',
    levels: [
      {
        id: 'lvl-da-4-1',
        worldId: 'world-da-4',
        title: 'Level 1: Feature Engineering & Baseline Models',
        order: 1,
        description: 'StandardScaler, One-Hot Encoding, train_test_split, and evaluation metrics.',
        sublevels: [
          {
            id: 'sub-da-4-1-1',
            levelId: 'lvl-da-4-1',
            worldId: 'world-da-4',
            title: '1.1 Machine Learning Evaluation Quiz',
            order: 1,
            summary: 'Deep-dive into Precision, Recall, F1-Score, and avoiding data leakage.',
            optionalResources: [
              {
                id: 'res-da-11',
                title: 'Scikit-Learn Documentation: Model Evaluation & Metrics',
                type: 'documentation',
                provider: 'Scikit-Learn.org',
                url: 'https://scikit-learn.org/stable/modules/model_evaluation.html',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-4-1-1',
                sublevelId: 'sub-da-4-1-1',
                title: 'Classification Metrics Mastery Quiz',
                type: 'quiz',
                xpReward: 50,
                description: 'Test your understanding of precision, recall, and false positives in high-stakes domains.',
                learningObjectives: [
                  'Understand the trade-off between Precision (minimizing false alarms) and Recall (catching all positive cases)',
                  'Prevent data leakage by fitting transformers strictly on training sets',
                ],
                hints: ['In disease or fraud detection, missing a positive case (False Negative) is usually far more critical.'],
                quizData: [
                  {
                    id: 'da-ml-1',
                    question: 'In a fraud detection model where missing a fraudulent transaction costs the company thousands of dollars, which metric should you prioritize maximizing?',
                    type: 'single',
                    options: [
                      'Recall (minimizing False Negatives so nearly all fraud is flagged)',
                      'Accuracy (because overall percentage is all that matters)',
                      'Random Chance',
                      'Specific Gravity',
                    ],
                    correctAnswerIndices: [0],
                    explanation: 'Recall measures the proportion of actual positives that were correctly identified. In fraud or medical diagnostics, false negatives are catastrophic, making recall the primary optimization metric.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-da-5',
    number: 5,
    title: 'World 5: A/B Testing & Production Insights',
    shortDesc: 'Hypothesis testing, statistical power, p-values, sample size estimation, and business impact.',
    color: 'from-rose-600 to-pink-700',
    levels: [
      {
        id: 'lvl-da-5-1',
        worldId: 'world-da-5',
        title: 'Level 1: Experimentation & Statistical Rigor',
        order: 1,
        description: 'Null hypothesis, Type I vs Type II errors, and sample size calculations.',
        sublevels: [
          {
            id: 'sub-da-5-1-1',
            levelId: 'lvl-da-5-1',
            worldId: 'world-da-5',
            title: '1.1 A/B Testing Rigor Quiz',
            order: 1,
            summary: 'Understand statistical sample sizes, peeking problems, and minimum detectable effects.',
            optionalResources: [
              {
                id: 'res-da-12',
                title: 'Harvard Business Review: A Refresher on A/B Testing',
                type: 'article',
                provider: 'HBR',
                url: 'https://hbr.org/2017/06/a-refresher-on-ab-testing',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-da-5-1-1',
                sublevelId: 'sub-da-5-1-1',
                title: 'A/B Experimentation Rigor Quiz',
                type: 'quiz',
                xpReward: 60,
                description: 'Test your understanding of sample sizes and statistical traps.',
                learningObjectives: [
                  'Avoid the "peeking problem" by fixing sample size in advance',
                  'Distinguish Type I error (false positive) from Type II error (false negative)',
                ],
                hints: ['Stopping an experiment early because of early high numbers leads to false positives.'],
                quizData: [
                  {
                    id: 'da-ab-1',
                    question: 'What is the "peeking problem" in online A/B testing?',
                    type: 'single',
                    options: [
                      'Users looking at the competitor website during the test',
                      'Repeatedly checking p-values every hour and stopping the test as soon as p < 0.05, which drastically inflates false positive rates',
                      'Hiding the submit button with CSS',
                      'Encrypting the database passwords',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Continuous monitoring without alpha corrections dramatically inflates Type I errors. Sample size and duration must be predetermined based on statistical power calculations.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

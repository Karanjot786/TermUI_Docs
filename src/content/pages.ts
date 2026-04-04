import type { ComponentType } from 'react'

import { GettingStartedInstallation } from './getting-started/installation'
import { GettingStartedQuickStart } from './getting-started/quick-start'
import { GettingStartedArchitecture } from './getting-started/architecture'
import { CoreOverview } from './core/overview'
import { CoreScreen } from './core/screen'
import { CoreInputParser } from './core/input-parser'
import { CoreEventEmitter } from './core/event-emitter'
import { CoreStyle } from './core/style'
import { CoreLayout } from './core/layout'
import { CoreApp } from './core/app'
import { WidgetsOverview } from './widgets/overview'
import { WidgetsVirtualList } from './widgets/virtual-list'
import { UiOverview } from './ui/overview'
import { TssOverview } from './tss/overview'
import { RouterOverview } from './router/overview'
import { MotionSprings } from './motion/springs'
import { MotionTransitions } from './motion/transitions'
import { StoreOverview } from './store/overview'
import { TestingOverview } from './testing/overview'
import { JsxContext } from './jsx/context'
import { JsxMemo } from './jsx/memo'
import { JsxUseAsync } from './jsx/use-async'
import { GuideFirstApp } from './guides/first-app'
import { GuideTesting } from './guides/testing'
import { DevServerOverview } from './guides/dev-server'
import { GuideQuick } from './guides/quick'
import { CoreUnicode } from './core/unicode'

export interface DocPage {
    title: string
    description: string
    component: ComponentType
    lastUpdated?: string
}

export const docPages: Record<string, DocPage> = {
    // ── Getting Started ──────────────────────────────────
    'getting-started/installation': {
        title: 'Installation',
        description: 'Install TermUI and set up your first project.',
        component: GettingStartedInstallation,
        lastUpdated: 'April 2025',
    },
    'getting-started/quick-start': {
        title: 'Quick Start',
        description: 'Build your first TermUI app in under 5 minutes.',
        component: GettingStartedQuickStart,
        lastUpdated: 'April 2025',
    },
    'getting-started/architecture': {
        title: 'Architecture',
        description: 'Understand the TermUI package graph and render pipeline.',
        component: GettingStartedArchitecture,
        lastUpdated: 'April 2025',
    },

    // ── Core ─────────────────────────────────────────────
    'core/overview': {
        title: 'Core Overview',
        description: 'The foundation of TermUI — App, Screen, Input, Events.',
        component: CoreOverview,
    },
    'core/screen': {
        title: 'Screen',
        description: 'Terminal screen buffer and rendering engine.',
        component: CoreScreen,
    },
    'core/input-parser': {
        title: 'Input Parser',
        description: 'Parse raw terminal input into structured key events.',
        component: CoreInputParser,
    },
    'core/event-emitter': {
        title: 'Event Emitter',
        description: 'Type-safe event system for inter-component communication.',
        component: CoreEventEmitter,
    },
    'core/style': {
        title: 'Style & Colors',
        description: 'ANSI colors, bold, italic, dim, and style composition.',
        component: CoreStyle,
    },
    'core/layout': {
        title: 'Layout Engine',
        description: 'Flexbox-inspired layout for terminal UI positioning.',
        component: CoreLayout,
    },
    'core/app': {
        title: 'App Lifecycle',
        description: 'Application bootstrap, lifecycle hooks, and shutdown.',
        component: CoreApp,
    },
    'core/unicode': {
        title: 'String Utilities',
        description: 'stringWidth, truncate, wordWrap, and stripAnsi for terminal text.',
        component: CoreUnicode,
    },

    // ── JSX ──────────────────────────────────────────────
    'jsx/context': {
        title: 'Context API',
        description: 'Share state across the component tree without prop drilling.',
        component: JsxContext,
    },
    'jsx/memo': {
        title: 'memo() & Batched Updates',
        description: 'Skip unnecessary re-renders and collapse multiple setState calls into one.',
        component: JsxMemo,
    },
    'jsx/use-async': {
        title: 'useAsync',
        description: 'Load async data with built-in loading, error, and refetch states.',
        component: JsxUseAsync,
    },

    // ── Widgets ──────────────────────────────────────────
    'widgets/overview': {
        title: 'Widgets Overview',
        description: 'Box, Text, Table, ProgressBar, Spinner, Gauge, VirtualList, and more.',
        component: WidgetsOverview,
    },
    'widgets/virtual-list': {
        title: 'VirtualList',
        description: 'Scroll-virtualized list — renders only visible rows for any dataset size.',
        component: WidgetsVirtualList,
    },

    // ── UI ───────────────────────────────────────────────
    'ui/overview': {
        title: 'UI Components Overview',
        description: 'Select, Tabs, Modal, Tree, Toast, Form, CommandPalette.',
        component: UiOverview,
        lastUpdated: 'April 2025',
    },

    // ── TSS ──────────────────────────────────────────────
    'tss/overview': {
        title: 'TSS Overview',
        description: 'Terminal Style Sheets — CSS-like theming for terminal apps.',
        component: TssOverview,
        lastUpdated: 'April 2025',
    },

    // ── Router ───────────────────────────────────────────
    'router/overview': {
        title: 'Router Overview',
        description: 'File-based routing with params, guards, and transitions.',
        component: RouterOverview,
    },

    // ── Motion ───────────────────────────────────────────
    'motion/springs': {
        title: 'Springs',
        description: 'Physics-based spring animations for smooth terminal motion.',
        component: MotionSprings,
        lastUpdated: 'April 2025',
    },
    'motion/transitions': {
        title: 'Transitions',
        description: 'Easing-based transition animations.',
        component: MotionTransitions,
        lastUpdated: 'April 2025',
    },

    // ── Store ────────────────────────────────────────────
    'store/overview': {
        title: 'Store',
        description: 'Zustand-like global state management with selector subscriptions.',
        component: StoreOverview,
    },

    // ── Testing ──────────────────────────────────────────
    'testing/overview': {
        title: 'Testing',
        description: 'In-memory test renderer — render, query, fire events, and assert.',
        component: TestingOverview,
    },

    // ── Guides ───────────────────────────────────────────
    'guides/first-app': {
        title: 'Build Your First App',
        description: 'Step-by-step guide to building a TermUI application.',
        component: GuideFirstApp,
        lastUpdated: 'April 2025',
    },
    'guides/testing': {
        title: 'Testing Guide',
        description: 'Write unit and integration tests for TermUI components.',
        component: GuideTesting,
    },
    'guides/dev-server': {
        title: 'Dev Server & Hot Reload',
        description: 'Instant feedback during development — automatic restart on file change.',
        component: DevServerOverview,
    },
    'guides/quick': {
        title: '@termuijs/quick',
        description: 'Rapid prototyping with reactive values, layout helpers, and a fluent app builder.',
        component: GuideQuick,
    },
}

import type { ComponentType } from 'react'

// MDX default exports are React components; named `frontmatter` export holds YAML metadata
import GettingStartedInstallation, { frontmatter as installationMeta } from './getting-started/installation.mdx'
import GettingStartedQuickStart, { frontmatter as quickStartMeta } from './getting-started/quick-start.mdx'
import GettingStartedArchitecture, { frontmatter as architectureMeta } from './getting-started/architecture.mdx'
import CoreOverview, { frontmatter as coreOverviewMeta } from './core/overview.mdx'
import CoreScreen, { frontmatter as coreScreenMeta } from './core/screen.mdx'
import CoreInputParser, { frontmatter as coreInputParserMeta } from './core/input-parser.mdx'
import CoreEventEmitter, { frontmatter as coreEventEmitterMeta } from './core/event-emitter.mdx'
import CoreStyle, { frontmatter as coreStyleMeta } from './core/style.mdx'
import CoreLayout, { frontmatter as coreLayoutMeta } from './core/layout.mdx'
import CoreApp, { frontmatter as coreAppMeta } from './core/app.mdx'
import CoreUnicode, { frontmatter as coreUnicodeMeta } from './core/unicode.mdx'
import JsxContext, { frontmatter as jsxContextMeta } from './jsx/context.mdx'
import JsxMemo, { frontmatter as jsxMemoMeta } from './jsx/memo.mdx'
import JsxUseAsync, { frontmatter as jsxUseAsyncMeta } from './jsx/use-async.mdx'
import JsxUseKeymap, { frontmatter as jsxUseKeymapMeta } from './jsx/use-keymap.mdx'
import JsxUseMotion, { frontmatter as jsxUseMotionMeta } from './jsx/use-motion.mdx'
import JsxErrorBoundary, { frontmatter as jsxErrorBoundaryMeta } from './jsx/error-boundary.mdx'
import JsxFocus, { frontmatter as jsxFocusMeta } from './jsx/focus.mdx'
import WidgetsOverview, { frontmatter as widgetsOverviewMeta } from './widgets/overview.mdx'
import WidgetsVirtualList, { frontmatter as widgetsVirtualListMeta } from './widgets/virtual-list.mdx'
import WidgetsDisplay, { frontmatter as widgetsDisplayMeta } from './widgets/display.mdx'
import WidgetsLayout, { frontmatter as widgetsLayoutMeta } from './widgets/layout.mdx'
import WidgetsCharts, { frontmatter as widgetsChartsMeta } from './widgets/charts.mdx'
import WidgetsFeedback, { frontmatter as widgetsFeedbackMeta } from './widgets/feedback.mdx'
import UiOverview, { frontmatter as uiOverviewMeta } from './ui/overview.mdx'
import UiNotifications, { frontmatter as uiNotificationsMeta } from './ui/notifications.mdx'
import UiPrompts, { frontmatter as uiPromptsMeta } from './ui/prompts.mdx'
import UiInputs, { frontmatter as uiInputsMeta } from './ui/inputs.mdx'
import TssOverview, { frontmatter as tssOverviewMeta } from './tss/overview.mdx'
import TssThemes, { frontmatter as tssThemesMeta } from './tss/themes.mdx'
import TssTokens, { frontmatter as tssTokensMeta } from './tss/tokens.mdx'
import RouterOverview, { frontmatter as routerOverviewMeta } from './router/overview.mdx'
import MotionSprings, { frontmatter as motionSpringsMeta } from './motion/springs.mdx'
import MotionTransitions, { frontmatter as motionTransitionsMeta } from './motion/transitions.mdx'
import StoreOverview, { frontmatter as storeOverviewMeta } from './store/overview.mdx'
import DataOverview, { frontmatter as dataOverviewMeta } from './data/overview.mdx'
import TestingOverview, { frontmatter as testingOverviewMeta } from './testing/overview.mdx'
import GuideFirstApp, { frontmatter as guideFirstAppMeta } from './guides/first-app.mdx'
import GuideTesting, { frontmatter as guideTestingMeta } from './guides/testing.mdx'
import DevServerOverview, { frontmatter as devServerMeta } from './guides/dev-server.mdx'
import GuideQuick, { frontmatter as guideQuickMeta } from './guides/quick.mdx'
import GuideTermuiVsInk, { frontmatter as termuiVsInkMeta } from './guides/termui-vs-ink.mdx'
import GuideWhatIsATui, { frontmatter as whatIsATuiMeta } from './guides/what-is-a-tui.mdx'
import GuideAccessibility, { frontmatter as accessibilityMeta } from './guides/accessibility.mdx'

export interface DocPage {
    title: string
    description: string
    component: ComponentType<{ components?: Record<string, ComponentType<any>> }>
    lastUpdated?: string
}

export const docPages: Record<string, DocPage> = {
    // ── Getting Started ──────────────────────────────────
    'getting-started/installation': {
        title: installationMeta.title as string,
        description: installationMeta.description as string,
        component: GettingStartedInstallation,
        lastUpdated: installationMeta.lastUpdated as string,
    },
    'getting-started/quick-start': {
        title: quickStartMeta.title as string,
        description: quickStartMeta.description as string,
        component: GettingStartedQuickStart,
        lastUpdated: quickStartMeta.lastUpdated as string,
    },
    'getting-started/architecture': {
        title: architectureMeta.title as string,
        description: architectureMeta.description as string,
        component: GettingStartedArchitecture,
        lastUpdated: architectureMeta.lastUpdated as string,
    },

    // ── Core ─────────────────────────────────────────────
    'core/overview': {
        title: coreOverviewMeta.title as string,
        description: coreOverviewMeta.description as string,
        component: CoreOverview,
        lastUpdated: coreOverviewMeta.lastUpdated as string,
    },
    'core/screen': {
        title: coreScreenMeta.title as string,
        description: coreScreenMeta.description as string,
        component: CoreScreen,
        lastUpdated: coreScreenMeta.lastUpdated as string,
    },
    'core/input-parser': {
        title: coreInputParserMeta.title as string,
        description: coreInputParserMeta.description as string,
        component: CoreInputParser,
        lastUpdated: coreInputParserMeta.lastUpdated as string,
    },
    'core/event-emitter': {
        title: coreEventEmitterMeta.title as string,
        description: coreEventEmitterMeta.description as string,
        component: CoreEventEmitter,
        lastUpdated: coreEventEmitterMeta.lastUpdated as string,
    },
    'core/style': {
        title: coreStyleMeta.title as string,
        description: coreStyleMeta.description as string,
        component: CoreStyle,
        lastUpdated: coreStyleMeta.lastUpdated as string,
    },
    'core/layout': {
        title: coreLayoutMeta.title as string,
        description: coreLayoutMeta.description as string,
        component: CoreLayout,
        lastUpdated: coreLayoutMeta.lastUpdated as string,
    },
    'core/app': {
        title: coreAppMeta.title as string,
        description: coreAppMeta.description as string,
        component: CoreApp,
        lastUpdated: coreAppMeta.lastUpdated as string,
    },
    'core/unicode': {
        title: coreUnicodeMeta.title as string,
        description: coreUnicodeMeta.description as string,
        component: CoreUnicode,
        lastUpdated: coreUnicodeMeta.lastUpdated as string,
    },

    // ── JSX ──────────────────────────────────────────────
    'jsx/context': {
        title: jsxContextMeta.title as string,
        description: jsxContextMeta.description as string,
        component: JsxContext,
        lastUpdated: jsxContextMeta.lastUpdated as string,
    },
    'jsx/memo': {
        title: jsxMemoMeta.title as string,
        description: jsxMemoMeta.description as string,
        component: JsxMemo,
        lastUpdated: jsxMemoMeta.lastUpdated as string,
    },
    'jsx/use-async': {
        title: jsxUseAsyncMeta.title as string,
        description: jsxUseAsyncMeta.description as string,
        component: JsxUseAsync,
        lastUpdated: jsxUseAsyncMeta.lastUpdated as string,
    },
    'jsx/use-keymap': {
        title: jsxUseKeymapMeta.title as string,
        description: jsxUseKeymapMeta.description as string,
        component: JsxUseKeymap,
        lastUpdated: jsxUseKeymapMeta.lastUpdated as string,
    },
    'jsx/use-motion': {
        title: jsxUseMotionMeta.title as string,
        description: jsxUseMotionMeta.description as string,
        component: JsxUseMotion,
        lastUpdated: jsxUseMotionMeta.lastUpdated as string,
    },
    'jsx/error-boundary': {
        title: jsxErrorBoundaryMeta.title as string,
        description: jsxErrorBoundaryMeta.description as string,
        component: JsxErrorBoundary,
        lastUpdated: jsxErrorBoundaryMeta.lastUpdated as string,
    },
    'jsx/focus': {
        title: jsxFocusMeta.title as string,
        description: jsxFocusMeta.description as string,
        component: JsxFocus,
        lastUpdated: jsxFocusMeta.lastUpdated as string,
    },

    // ── Widgets ──────────────────────────────────────────
    'widgets/overview': {
        title: widgetsOverviewMeta.title as string,
        description: widgetsOverviewMeta.description as string,
        component: WidgetsOverview,
        lastUpdated: widgetsOverviewMeta.lastUpdated as string,
    },
    'widgets/virtual-list': {
        title: widgetsVirtualListMeta.title as string,
        description: widgetsVirtualListMeta.description as string,
        component: WidgetsVirtualList,
        lastUpdated: widgetsVirtualListMeta.lastUpdated as string,
    },
    'widgets/display': {
        title: widgetsDisplayMeta.title as string,
        description: widgetsDisplayMeta.description as string,
        component: WidgetsDisplay,
        lastUpdated: widgetsDisplayMeta.lastUpdated as string,
    },
    'widgets/layout': {
        title: widgetsLayoutMeta.title as string,
        description: widgetsLayoutMeta.description as string,
        component: WidgetsLayout,
        lastUpdated: widgetsLayoutMeta.lastUpdated as string,
    },
    'widgets/charts': {
        title: widgetsChartsMeta.title as string,
        description: widgetsChartsMeta.description as string,
        component: WidgetsCharts,
        lastUpdated: widgetsChartsMeta.lastUpdated as string,
    },
    'widgets/feedback': {
        title: widgetsFeedbackMeta.title as string,
        description: widgetsFeedbackMeta.description as string,
        component: WidgetsFeedback,
        lastUpdated: widgetsFeedbackMeta.lastUpdated as string,
    },

    // ── UI ───────────────────────────────────────────────
    'ui/overview': {
        title: uiOverviewMeta.title as string,
        description: uiOverviewMeta.description as string,
        component: UiOverview,
        lastUpdated: uiOverviewMeta.lastUpdated as string,
    },
    'ui/notifications': {
        title: uiNotificationsMeta.title as string,
        description: uiNotificationsMeta.description as string,
        component: UiNotifications,
        lastUpdated: uiNotificationsMeta.lastUpdated as string,
    },
    'ui/prompts': {
        title: uiPromptsMeta.title as string,
        description: uiPromptsMeta.description as string,
        component: UiPrompts,
        lastUpdated: uiPromptsMeta.lastUpdated as string,
    },
    'ui/inputs': {
        title: uiInputsMeta.title as string,
        description: uiInputsMeta.description as string,
        component: UiInputs,
        lastUpdated: uiInputsMeta.lastUpdated as string,
    },

    // ── TSS ──────────────────────────────────────────────
    'tss/overview': {
        title: tssOverviewMeta.title as string,
        description: tssOverviewMeta.description as string,
        component: TssOverview,
        lastUpdated: tssOverviewMeta.lastUpdated as string,
    },
    'tss/themes': {
        title: tssThemesMeta.title as string,
        description: tssThemesMeta.description as string,
        component: TssThemes,
        lastUpdated: tssThemesMeta.lastUpdated as string,
    },
    'tss/tokens': {
        title: tssTokensMeta.title as string,
        description: tssTokensMeta.description as string,
        component: TssTokens,
        lastUpdated: tssTokensMeta.lastUpdated as string,
    },

    // ── Router ───────────────────────────────────────────
    'router/overview': {
        title: routerOverviewMeta.title as string,
        description: routerOverviewMeta.description as string,
        component: RouterOverview,
        lastUpdated: routerOverviewMeta.lastUpdated as string,
    },

    // ── Motion ───────────────────────────────────────────
    'motion/springs': {
        title: motionSpringsMeta.title as string,
        description: motionSpringsMeta.description as string,
        component: MotionSprings,
        lastUpdated: motionSpringsMeta.lastUpdated as string,
    },
    'motion/transitions': {
        title: motionTransitionsMeta.title as string,
        description: motionTransitionsMeta.description as string,
        component: MotionTransitions,
        lastUpdated: motionTransitionsMeta.lastUpdated as string,
    },

    // ── Store ────────────────────────────────────────────
    'store/overview': {
        title: storeOverviewMeta.title as string,
        description: storeOverviewMeta.description as string,
        component: StoreOverview,
        lastUpdated: storeOverviewMeta.lastUpdated as string,
    },

    // ── Data ─────────────────────────────────────────────
    'data/overview': {
        title: dataOverviewMeta.title as string,
        description: dataOverviewMeta.description as string,
        component: DataOverview,
        lastUpdated: dataOverviewMeta.lastUpdated as string,
    },

    // ── Testing ──────────────────────────────────────────
    'testing/overview': {
        title: testingOverviewMeta.title as string,
        description: testingOverviewMeta.description as string,
        component: TestingOverview,
        lastUpdated: testingOverviewMeta.lastUpdated as string,
    },

    // ── Guides ───────────────────────────────────────────
    'guides/first-app': {
        title: guideFirstAppMeta.title as string,
        description: guideFirstAppMeta.description as string,
        component: GuideFirstApp,
        lastUpdated: guideFirstAppMeta.lastUpdated as string,
    },
    'guides/testing': {
        title: guideTestingMeta.title as string,
        description: guideTestingMeta.description as string,
        component: GuideTesting,
        lastUpdated: guideTestingMeta.lastUpdated as string,
    },
    'guides/dev-server': {
        title: devServerMeta.title as string,
        description: devServerMeta.description as string,
        component: DevServerOverview,
        lastUpdated: devServerMeta.lastUpdated as string,
    },
    'guides/quick': {
        title: guideQuickMeta.title as string,
        description: guideQuickMeta.description as string,
        component: GuideQuick,
        lastUpdated: guideQuickMeta.lastUpdated as string,
    },
    'guides/termui-vs-ink': {
        title: termuiVsInkMeta.title as string,
        description: termuiVsInkMeta.description as string,
        component: GuideTermuiVsInk,
        lastUpdated: termuiVsInkMeta.lastUpdated as string,
    },
    'guides/what-is-a-tui': {
        title: whatIsATuiMeta.title as string,
        description: whatIsATuiMeta.description as string,
        component: GuideWhatIsATui,
        lastUpdated: whatIsATuiMeta.lastUpdated as string,
    },
    'guides/accessibility': {
        title: accessibilityMeta.title as string,
        description: accessibilityMeta.description as string,
        component: GuideAccessibility,
        lastUpdated: accessibilityMeta.lastUpdated as string,
    },
}

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
import RouterGuards, { frontmatter as routerGuardsMeta } from './router/guards.mdx'
import RouterQueryStrings, { frontmatter as routerQueryStringsMeta } from './router/query-strings.mdx'
import RouterHooks, { frontmatter as routerHooksMeta } from './router/hooks.mdx'
import MotionSprings, { frontmatter as motionSpringsMeta } from './motion/springs.mdx'
import MotionTransitions, { frontmatter as motionTransitionsMeta } from './motion/transitions.mdx'
import StoreOverview, { frontmatter as storeOverviewMeta } from './store/overview.mdx'
import StoreMiddleware, { frontmatter as storeMiddlewareMeta } from './store/middleware.mdx'
import StoreSelectors, { frontmatter as storeSelectorsMeta } from './store/selectors.mdx'
import StoreApi, { frontmatter as storeApiMeta } from './store/api.mdx'
import DataOverview, { frontmatter as dataOverviewMeta } from './data/overview.mdx'
import DataHooks, { frontmatter as dataHooksMeta } from './data/hooks.mdx'
import DataSystemMonitoring, { frontmatter as dataSystemMonitoringMeta } from './data/system-monitoring.mdx'
import DataDocker, { frontmatter as dataDockerMeta } from './data/docker.mdx'
import DataDatabase, { frontmatter as dataDatabaseMeta } from './data/database.mdx'
import TestingOverview, { frontmatter as testingOverviewMeta } from './testing/overview.mdx'
import AdaptersOverview, { frontmatter as adaptersOverviewMeta } from './adapters/overview.mdx'
import AdaptersAi, { frontmatter as adaptersAiMeta } from './adapters/ai.mdx'
import AdaptersStorage, { frontmatter as adaptersStorageMeta } from './adapters/storage.mdx'
import AdaptersCliTools, { frontmatter as adaptersCliToolsMeta } from './adapters/cli-tools.mdx'
import AdaptersIntegrations, { frontmatter as adaptersIntegrationsMeta } from './adapters/integrations.mdx'
import JsxHooksOverview, { frontmatter as jsxHooksOverviewMeta } from './jsx/hooks-overview.mdx'
import JsxUseInput, { frontmatter as jsxUseInputMeta } from './jsx/use-input.mdx'
import WidgetsInputs, { frontmatter as widgetsInputsMeta } from './widgets/inputs.mdx'
import WidgetsChartsPackage, { frontmatter as widgetsChartsPackageMeta } from './widgets/charts-package.mdx'
import CreateTermuiAppOverview, { frontmatter as createTermuiAppOverviewMeta } from './create-termui-app/overview.mdx'
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
    'router/guards': {
        title: routerGuardsMeta.title as string,
        description: routerGuardsMeta.description as string,
        component: RouterGuards,
        lastUpdated: routerGuardsMeta.lastUpdated as string,
    },
    'router/query-strings': {
        title: routerQueryStringsMeta.title as string,
        description: routerQueryStringsMeta.description as string,
        component: RouterQueryStrings,
        lastUpdated: routerQueryStringsMeta.lastUpdated as string,
    },
    'router/hooks': {
        title: routerHooksMeta.title as string,
        description: routerHooksMeta.description as string,
        component: RouterHooks,
        lastUpdated: routerHooksMeta.lastUpdated as string,
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
    'store/middleware': {
        title: storeMiddlewareMeta.title as string,
        description: storeMiddlewareMeta.description as string,
        component: StoreMiddleware,
        lastUpdated: storeMiddlewareMeta.lastUpdated as string,
    },
    'store/selectors': {
        title: storeSelectorsMeta.title as string,
        description: storeSelectorsMeta.description as string,
        component: StoreSelectors,
        lastUpdated: storeSelectorsMeta.lastUpdated as string,
    },
    'store/api': {
        title: storeApiMeta.title as string,
        description: storeApiMeta.description as string,
        component: StoreApi,
        lastUpdated: storeApiMeta.lastUpdated as string,
    },

    // ── Data ─────────────────────────────────────────────
    'data/overview': {
        title: dataOverviewMeta.title as string,
        description: dataOverviewMeta.description as string,
        component: DataOverview,
        lastUpdated: dataOverviewMeta.lastUpdated as string,
    },
    'data/hooks': {
        title: dataHooksMeta.title as string,
        description: dataHooksMeta.description as string,
        component: DataHooks,
        lastUpdated: dataHooksMeta.lastUpdated as string,
    },
    'data/system-monitoring': {
        title: dataSystemMonitoringMeta.title as string,
        description: dataSystemMonitoringMeta.description as string,
        component: DataSystemMonitoring,
        lastUpdated: dataSystemMonitoringMeta.lastUpdated as string,
    },
    'data/docker': {
        title: dataDockerMeta.title as string,
        description: dataDockerMeta.description as string,
        component: DataDocker,
        lastUpdated: dataDockerMeta.lastUpdated as string,
    },
    'data/database': {
        title: dataDatabaseMeta.title as string,
        description: dataDatabaseMeta.description as string,
        component: DataDatabase,
        lastUpdated: dataDatabaseMeta.lastUpdated as string,
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

    // ── JSX new pages ────────────────────────────────────
    'jsx/hooks-overview': {
        title: jsxHooksOverviewMeta.title as string,
        description: jsxHooksOverviewMeta.description as string,
        component: JsxHooksOverview,
        lastUpdated: jsxHooksOverviewMeta.lastUpdated as string,
    },
    'jsx/use-input': {
        title: jsxUseInputMeta.title as string,
        description: jsxUseInputMeta.description as string,
        component: JsxUseInput,
        lastUpdated: jsxUseInputMeta.lastUpdated as string,
    },

    // ── Widgets new pages ────────────────────────────────
    'widgets/inputs': {
        title: widgetsInputsMeta.title as string,
        description: widgetsInputsMeta.description as string,
        component: WidgetsInputs,
        lastUpdated: widgetsInputsMeta.lastUpdated as string,
    },
    'widgets/charts-package': {
        title: widgetsChartsPackageMeta.title as string,
        description: widgetsChartsPackageMeta.description as string,
        component: WidgetsChartsPackage,
        lastUpdated: widgetsChartsPackageMeta.lastUpdated as string,
    },

    // ── Adapters ─────────────────────────────────────────
    'adapters/overview': {
        title: adaptersOverviewMeta.title as string,
        description: adaptersOverviewMeta.description as string,
        component: AdaptersOverview,
        lastUpdated: adaptersOverviewMeta.lastUpdated as string,
    },
    'adapters/ai': {
        title: adaptersAiMeta.title as string,
        description: adaptersAiMeta.description as string,
        component: AdaptersAi,
        lastUpdated: adaptersAiMeta.lastUpdated as string,
    },
    'adapters/storage': {
        title: adaptersStorageMeta.title as string,
        description: adaptersStorageMeta.description as string,
        component: AdaptersStorage,
        lastUpdated: adaptersStorageMeta.lastUpdated as string,
    },
    'adapters/cli-tools': {
        title: adaptersCliToolsMeta.title as string,
        description: adaptersCliToolsMeta.description as string,
        component: AdaptersCliTools,
        lastUpdated: adaptersCliToolsMeta.lastUpdated as string,
    },
    'adapters/integrations': {
        title: adaptersIntegrationsMeta.title as string,
        description: adaptersIntegrationsMeta.description as string,
        component: AdaptersIntegrations,
        lastUpdated: adaptersIntegrationsMeta.lastUpdated as string,
    },

    // ── create-termui-app ────────────────────────────────
    'create-termui-app/overview': {
        title: createTermuiAppOverviewMeta.title as string,
        description: createTermuiAppOverviewMeta.description as string,
        component: CreateTermuiAppOverview,
        lastUpdated: createTermuiAppOverviewMeta.lastUpdated as string,
    },
}

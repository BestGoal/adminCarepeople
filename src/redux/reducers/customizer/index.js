import themeConfig from "../../../configs/themeConfig"
import { THEMSET } from "../../types/index"

export default (state = themeConfig, action) => {
  switch (action.type) {
    case THEMSET:
      return { ...state,theme: action.theme.theme,
        direction: action.theme.direction,
        disableCustomizer: action.theme.disableCustomizer,
        disableThemeTour: action.theme.disableThemeTour,
        footerType: action.theme.footerType,
        hideScrollToTop: action.theme.hideScrollToTop,
        layout: action.theme.layout,
        menuTheme: action.theme.menuTheme,
        navbarColor: action.theme.navbarColor,
        navbarType: action.theme.navbarType,
        sidebarCollapsed: action.theme.sidebarCollapsed
      }
    case "CHANGE_MODE":
      return { ...state, theme: action.mode }
    case "COLLAPSE_SIDEBAR":
      return { ...state, sidebarCollapsed: action.value }
    case "CHANGE_NAVBAR_COLOR":
      return { ...state, navbarColor: action.color }
    case "CHANGE_NAVBAR_TYPE":
      return { ...state, navbarType: action.style }
    case "CHANGE_FOOTER_TYPE":
      return { ...state, footerType: action.style }
    case "CHANGE_MENU_COLOR":
      return { ...state, menuTheme: action.style }
    case "HIDE_SCROLL_TO_TOP":
      return { ...state, hideScrollToTop: action.value }
    default:
      return state
  }
}
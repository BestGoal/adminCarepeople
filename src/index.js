import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./utility/Layout";
import configureStore from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import Router from "./Router";
import { sessionCheck } from "./redux/actions/auth/loginActions";

import "./assets/scss/app.scss";
import "./assets/scss/plugins/extensions/react-paginate.scss";
import "./assets/scss/pages/data-list.scss";
import "./assets/scss/plugins/forms/switch/react-toggle.scss";
import "./assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "./assets/scss/pages/app-ecommerce-shop.scss";
import "./assets/scss/plugins/extensions/slider.scss";
import "./assets/scss/plugins/extensions/toastr.scss";
import "./components/@vuexy/rippleButton/RippleButton";
import "flatpickr/dist/themes/light.css";
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import "react-toggle/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'bootstrap-daterangepicker/daterangepicker.css'

const renderApp = preloadedState => {
	const store = configureStore(preloadedState);
	ReactDOM.render(
		<Provider store={store}>
			<Suspense fallback={<Spinner />}>
				<Layout>
					<Router />
				</Layout>
			</Suspense>
		</Provider>,
		document.getElementById("root")
	);
}

(async () => renderApp(await sessionCheck()))();
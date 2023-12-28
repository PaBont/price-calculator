import './app.css';
import App from './App.svelte';

let appContainer = document.getElementById('app');
if (appContainer === null) {
    appContainer = document.createElement('div');
    appContainer.id = 'app';
    document.body.append(appContainer);
}
// test
const app = new App({
    target: appContainer,
});

export default app;

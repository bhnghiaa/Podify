import AppCotnainer from '@components/AppCotnainer';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import AppNavigator from 'src/navigation';
import store from 'src/store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppCotnainer>
          <AppNavigator />
        </AppCotnainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

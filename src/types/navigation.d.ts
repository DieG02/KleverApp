import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definition of navigation routes
export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Collection: {
    id: string;
    title: string;
  };
  Settings: undefined;
  DeleteAccount: undefined;
};

// Types of navigation
export type NavigationProps = StackNavigationProp<RootStackParamList>;
export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>;
export type AppNavigationProps = StackNavigationProp<AppStackParamList>;

// Types of routes
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
export type AuthRouteProps<T extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  T
>;
export type AppRouteProps<T extends keyof AppStackParamList> = RouteProp<
  AppStackParamList,
  T
>;

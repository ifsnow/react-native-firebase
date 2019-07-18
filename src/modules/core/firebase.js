/**
 * @flow
 */
import { NativeModules } from 'react-native';

import APPS from '../../utils/apps';
import INTERNALS from '../../utils/internals';
import VERSION from '../../version';

import {
  statics as AnalyticsStatics,
  MODULE_NAME as AnalyticsModuleName,
} from '../analytics';
import {
  statics as ConfigStatics,
  MODULE_NAME as ConfigModuleName,
} from '../config';
import {
  statics as CrashlyticsStatics,
  MODULE_NAME as CrashlyticsModuleName,
} from '../crashlytics';
import {
  statics as InstanceIdStatics,
  MODULE_NAME as InstanceIdModuleName,
} from '../iid';
import {
  statics as MessagingStatics,
  MODULE_NAME as MessagingModuleName,
} from '../messaging';
import {
  statics as NotificationsStatics,
  MODULE_NAME as NotificationsModuleName,
} from '../notifications';
import {
  statics as UtilsStatics,
  MODULE_NAME as UtilsModuleName,
} from '../utils';

import type {
  AnalyticsModule,
  ConfigModule,
  CrashlyticsModule,
  InstanceIdModule,
  MessagingModule,
  NotificationsModule,
  UtilsModule,
} from '../../types';

const FirebaseCoreModule = NativeModules.RNFirebase;

class Firebase {
  analytics: AnalyticsModule;

  config: ConfigModule;

  crashlytics: CrashlyticsModule;

  iid: InstanceIdModule;

  messaging: MessagingModule;

  notifications: NotificationsModule;

  utils: UtilsModule;

  constructor() {
    if (!FirebaseCoreModule) {
      throw new Error(INTERNALS.STRINGS.ERROR_MISSING_CORE);
    }
    APPS.initializeNativeApps();

    // modules
    this.analytics = APPS.moduleAndStatics(
      'analytics',
      AnalyticsStatics,
      AnalyticsModuleName
    );
    this.config = APPS.moduleAndStatics(
      'config',
      ConfigStatics,
      ConfigModuleName
    );
    this.crashlytics = APPS.moduleAndStatics(
      'crashlytics',
      CrashlyticsStatics,
      CrashlyticsModuleName
    );
    this.iid = APPS.moduleAndStatics(
      'iid',
      InstanceIdStatics,
      InstanceIdModuleName
    );
    this.messaging = APPS.moduleAndStatics(
      'messaging',
      MessagingStatics,
      MessagingModuleName
    );
    this.notifications = APPS.moduleAndStatics(
      'notifications',
      NotificationsStatics,
      NotificationsModuleName
    );
    this.utils = APPS.moduleAndStatics('utils', UtilsStatics, UtilsModuleName);
  }

  /**
   * Web SDK initializeApp
   *
   * @param options
   * @param name
   * @return {*}
   */
  initializeApp(options: FirebaseOptions, name: string): App {
    return APPS.initializeApp(options, name);
  }

  /**
   * Retrieves a Firebase app instance.
   *
   * When called with no arguments, the default app is returned.
   * When an app name is provided, the app corresponding to that name is returned.
   *
   * @param name
   * @return {*}
   */
  app(name?: string): App {
    return APPS.app(name);
  }

  /**
   * A (read-only) array of all initialized apps.
   * @return {Array}
   */
  get apps(): Array<App> {
    return APPS.apps();
  }

  /**
   * The current SDK version.
   * @return {string}
   */
  get SDK_VERSION(): string {
    return VERSION;
  }
}

const firebaseApp = new Firebase();
export default firebaseApp;
export const {
  analytics,
  config,
  crashlytics,
  iid,
  messaging,
  notifications,
  utils,
} = firebaseApp;

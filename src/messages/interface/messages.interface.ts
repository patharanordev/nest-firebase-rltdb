export interface DataMessagePayload {
  [key: string]: string;
}

export interface NotificationMessagePayload {
  /**
   * Identifier used to replace existing notifications in the notification drawer.
   *
   * If not specified, each request creates a new notification.
   *
   * If specified and a notification with the same tag is already being shown,
   * the new notification replaces the existing one in the notification drawer.
   *
   * **Platforms:** Android
   */
  tag?: string;
  /**
   * The notification's body text.
   *
   * **Platforms:** iOS, Android, Web
   */
  body?: string;
  /**
   * The notification's icon.
   *
   * **Android:** Sets the notification icon to `myicon` for drawable resource
   * `myicon`. If you don't send this key in the request, FCM displays the
   * launcher icon specified in your app manifest.
   *
   * **Web:** The URL to use for the notification's icon.
   *
   * **Platforms:** Android, Web
   */
  icon?: string;
  /**
   * The value of the badge on the home screen app icon.
   *
   * If not specified, the badge is not changed.
   *
   * If set to `0`, the badge is removed.
   *
   * **Platforms:** iOS
   */
  badge?: string;
  /**
   * The notification icon's color, expressed in `#rrggbb` format.
   *
   * **Platforms:** Android
   */
  color?: string;
  /**
   * The sound to be played when the device receives a notification. Supports
   * "default" for the default notification sound of the device or the filename of a
   * sound resource bundled in the app.
   * Sound files must reside in `/res/raw/`.
   *
   * **Platforms:** Android
   */
  sound?: string;
  /**
   * The notification's title.
   *
   * **Platforms:** iOS, Android, Web
   */
  title?: string;
  /**
   * The key to the body string in the app's string resources to use to localize
   * the body text to the user's current localization.
   *
   * **iOS:** Corresponds to `loc-key` in the APNs payload. See
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html |
   * Payload Key Reference} and
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW9 |
   * Localizing the Content of Your Remote Notifications} for more information.
   *
   * **Android:** See
   * {@link http://developer.android.com/guide/topics/resources/string-resource.html | String Resources}
   * for more information.
   *
   * **Platforms:** iOS, Android
   */
  bodyLocKey?: string;
  /**
   * Variable string values to be used in place of the format specifiers in
   * `body_loc_key` to use to localize the body text to the user's current
   * localization.
   *
   * The value should be a stringified JSON array.
   *
   * **iOS:** Corresponds to `loc-args` in the APNs payload. See
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html |
   * Payload Key Reference} and
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW9 |
   * Localizing the Content of Your Remote Notifications} for more information.
   *
   * **Android:** See
   * {@link http://developer.android.com/guide/topics/resources/string-resource.html#FormattingAndStyling |
   * Formatting and Styling} for more information.
   *
   * **Platforms:** iOS, Android
   */
  bodyLocArgs?: string;
  /**
   * Action associated with a user click on the notification. If specified, an
   * activity with a matching Intent Filter is launched when a user clicks on the
   * notification.
   *
   *   * **Platforms:** Android
   */
  clickAction?: string;
  /**
   * The key to the title string in the app's string resources to use to localize
   * the title text to the user's current localization.
   *
   * **iOS:** Corresponds to `title-loc-key` in the APNs payload. See
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html |
   * Payload Key Reference} and
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW9 |
   * Localizing the Content of Your Remote Notifications} for more information.
   *
   * **Android:** See
   * {@link http://developer.android.com/guide/topics/resources/string-resource.html | String Resources}
   * for more information.
   *
   * **Platforms:** iOS, Android
   */
  titleLocKey?: string;
  /**
   * Variable string values to be used in place of the format specifiers in
   * `title_loc_key` to use to localize the title text to the user's current
   * localization.
   *
   * The value should be a stringified JSON array.
   *
   * **iOS:** Corresponds to `title-loc-args` in the APNs payload. See
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html |
   * Payload Key Reference} and
   * {@link https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW9 |
   * Localizing the Content of Your Remote Notifications} for more information.
   *
   * **Android:** See
   * {@link http://developer.android.com/guide/topics/resources/string-resource.html#FormattingAndStyling |
   * Formatting and Styling} for more information.
   *
   * **Platforms:** iOS, Android
   */
  titleLocArgs?: string;
  [key: string]: string | undefined;
}

export interface MessagingPayload {
  /**
   * The data message payload.
   */
  data?: DataMessagePayload;
  /**
   * The notification message payload.
   */
  notification?: NotificationMessagePayload;
}

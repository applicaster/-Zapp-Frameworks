const common = [];

const mobile = [
  {
    key: "custom_margin_top",
    type: "number_input",
    label: "Top Padding",
    label_tooltip: "Top padding top for component",
    initial_value: 0,
  },
  {
    key: "user_image_placeholder",
    type: "uploader",
    label: "User Image Placeholder",
    placeholder: "Upload an image",
  },
  {
    key: "user_image_bottom_margin",
    type: "number_input",
    label: "Bottom Margin"
    label_tooltip: "Bottom margin for user image",
    initial_value: 23,
  },
  {
    group: true,
    label: "Login Button 1 Styles",
    tooltip: "These fields affect Login 1 Button styles",
    folded: true,
    fields: [
      {
        key: "button_1_login_type",
        type: "select",
        options: [
          { text: "Inplayer", value: "in_player" },
          { text: "Cleeng", value: "cleeng" },
          { text: "Adobe primetime", value: "adobe_primetime" },
          { text: "Oauth2", value: "oauth_2" },
          { text: "Other", value: "other" },
        ],
        initial_value: "in_player",
        mandatory: true,
        label: "Select Login Type",
        placeholder: "Select login type",
      },
      {
        key: "button_1_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_1_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_1_custom_screen_id",
        type: "text_input",
        initial_value: "",
        label: "Screen ID for Plugin (optional)",
        placeholder: "Custom plugin namespace",
      },
      {
        key: "button_1_custom_namespace",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Namespace",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_token_key",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Token Key",
        placeholder: "Custom plugin token key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_user_id_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_subscription_price_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_subscription_renews_date_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_user_photo_url_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 239,
      },
      {
        key: "button_1_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 12,
      },
      {
        key: "button_1_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 16,
      },
      {
        key: "button_1_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 0,
      },
      {
        key: "button_1_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_1_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_1_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_1_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_1_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_1_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_1_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Toggle title font family for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_1_title_text_font_ios",
        type: "ios_font_selector",
        label: "Title Font iOS"
        label_tooltip: " Toggle title font family for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_1_title_text_fontsize",
        type: "number_input",
        label: "Font size"
        label_tooltip: "Font size toggle title",
        initial_value: 12,
      },
    ],
  },
  {
    key: "button_2_login_enabled",
    label: "Switch to Enable Login Button 2",
    type: "Switch",
    initial_value: false,
  },
  {
    group: true,
    label: "Login Button 2 Styles",
    tooltip: "These fields affect login 2 button styles",
    folded: true,
    conditional_fields: [
      {
        condition_value: [false],
        key: "styles/login_button_2_enabled",
      },
    ],
    fields: [
      {
        key: "button_2_login_type",
        type: "select",
        options: [
          { text: "Inplayer", value: "in_player" },
          { text: "Cleeng", value: "cleeng" },
          { text: "Adobe primetime", value: "adobe_primetime" },
          { text: "Oauth2", value: "oauth_2" },
          { text: "Other", value: "other" },
        ],
        initial_value: "in_player",
        mandatory: true,
        label: "Select Login Type",
        placeholder: "Select login type",
      },
      {
        key: "button_2_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_2_background_image_focused",
        type: "uploader",
        label: "Button Background Focused Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_2_custom_screen_id",
        type: "text_input",
        initial_value: "",
        label: "Screen ID for Pluin (optional)",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_namespace",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Namespace",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_token_key",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Token Key",
        placeholder: "Custom plugin token key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_user_id_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_subscription_price_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_subscription_renews_date_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_user_photo_url_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 239,
      },
      {
        key: "button_2_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 12,
      },
      {
        key: "button_2_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 16,
      },
      {
        key: "button_2_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_2_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_2_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_2_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_2_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_2_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_2_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_2_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_2_title_text_font_ios",
        type: "ios_font_selector",
        label: "Title Font iOS"
        label_tooltip: "Font for the toggle title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_2_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 12,
      },
    ],
  },
  {
    group: true,
    label: "Info View Styles",
    tooltip: "These fields affect information views",
    folded: true,
    fields: [
      {
        key: "info_label_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Color for the toggle component's title",
        initial_value: "#ffffffff",
      },
      {
        key: "info_label_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font family for the toggle component's title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "info_label_title_text_font_ios",
        type: "ios_font_selector",
        label: "Tille Font iOS"
        label_tooltip: "Font family for the toggle component's title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "info_label_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size for the toggle component's title",
        initial_value: "16",
      },
      {
        key: "info_label_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin"
        label_tooltip: "Bottom margin for the component's button",
        initial_value: 5,
      },
      {
        key: "info_label_description_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29B3",
      },
      {
        key: "info_label_description_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "info_label_description_title_text_font_ios",
        type: "ios_font_selector",
        label: "Title Font iOS"
        label_tooltip: "Font for the toggle title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "info_label_description_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 12,
      },
      {
        key: "info_label_description_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 5,
      },
    ],
  },
  {
    group: true,
    label: "Logout Button Styles",
    tooltip: "These fields affect small logout button styles",
    folded: true,
    fields: [
      {
        key: "button_logout_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 99,
      },
      {
        key: "button_logout_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 12,
      },
      {
        key: "button_logout_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 13,
      },
      {
        key: "button_logout_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_logout_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "#979797ff",
      },
      {
        key: "button_logout_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_logout_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_logout_title_text_font_ios",
        type: "ios_font_selector",
        label: "Title Font iOS"
        label_tooltip: "Font for the toggle title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_logout_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 10,
      },
    ],
  },
  {
    group: true,
    label: "Logout Big Button Styles",
    tooltip: "These fields affect big logout button styles",
    folded: true,
    fields: [
      {
        key: "button_logout_big_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_big_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_big_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 239,
      },
      {
        key: "button_logout_big_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 12,
      },
      {
        key: "button_logout_big_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 13,
      },
      {
        key: "button_logout_big_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_logout_big_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "#979797ff",
      },
      {
        key: "button_logout_big_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_logout_big_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_big_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_big_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_big_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_big_title_text_font_android",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_logout_big_title_text_font_ios",
        type: "ios_font_selector",
        label: "Title Font iOS"
        label_tooltip: "Font for the toggle title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_logout_big_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: "12",
      },
    ],
  },
  {
    group: true,
    label: "Debug",
    tooltip: "For development purposes",
    folded: true,
    fields: [
      {
        type: "tag_select",
        key: "debug_dummy_data_source",
        tooltip_text: "Use dummy data source to test UI",
        options: [
          {
            text: "On",
            value: "on",
          },
          {
            text: "Off",
            value: "off",
          },
        ],
        initial_value: "off",
      },
    ],
  },
];

const tv = [
  {
    key: "custom_margin_top",
    type: "number_input",
    label: "Padding"
    label_tooltip: "Padding top for component UI",
    initial_value: 100,
  },
  {
    key: "user_image_placeholder",
    type: "uploader",
    label: "User Image Placeholder",
    placeholder: "Upload a file",
  },
  {
    key: "user_image_bottom_margin",
    type: "number_input",
    label: "User Image Bottom Margin"
    label_tooltip: "User image margin bottom",
    initial_value: 35,
  },
  {
    group: true,
    label: "Login Button 1 Styles",
    tooltip: "These fields affect login 1 button styles",
    folded: true,
    fields: [
      {
        key: "button_1_login_type",
        type: "select",
        options: [
          { text: "Inplayer", value: "in_player" },
          { text: "Cleeng", value: "cleeng" },
          { text: "Adobe primetime", value: "adobe_primetime" },
          { text: "Oauth2", value: "oauth_2" },
          { text: "Other", value: "other" },
        ],
        initial_value: "in_player",
        mandatory: true,
        label: "Select Login Type",
        placeholder: "Select login type",
      },
      {
        key: "button_1_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_1_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_1_custom_screen_id",
        type: "text_input",
        initial_value: "",
        label: "Screen ID for Plugin (optional)",
        placeholder: "Custom plugin namespace",
      },
      {
        key: "button_1_custom_namespace",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Namespace",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_token_key",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Token Key",
        placeholder: "Custom plugin token key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_user_id_key",
        type: "text_input",
        initial_value: "",
        label: "Custom user ID key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_subscription_price_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_subscription_renews_date_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_custom_user_photo_url_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_1_login_type",
          },
        ],
      },
      {
        key: "button_1_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 544,
      },
      {
        key: "button_1_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 27,
      },
      {
        key: "button_1_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 16,
      },
      {
        key: "button_1_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 0,
      },
      {
        key: "button_1_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_1_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_1_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_1_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_1_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_1_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_1_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_1_title_text_font_tvos",
        type: "tvos_font_selector",
        label: "Title Font TVOS"
        label_tooltip: "Font for the toggle title for TVOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_1_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "button_1_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "button_1_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 29,
      },
    ],
  },
  {
    key: "button_2_login_enabled",
    label: "Switch to Enable Login Button 2",
    type: "Switch",
    initial_value: false,
  },
  {
    group: true,
    label: "Login Button 2 Styles",
    tooltip: "These fields affect login 2 button styles",
    folded: true,
    conditional_fields: [
      {
        condition_value: [false],
        key: "styles/login_button_2_enabled",
      },
    ],
    fields: [
      {
        key: "button_2_login_type",
        type: "select",
        options: [
          { text: "Inplayer", value: "in_player" },
          { text: "Cleeng", value: "cleeng" },
          { text: "Adobe primetime", value: "adobe_primetime" },
          { text: "Oauth2", value: "oauth_2" },
          { text: "Other", value: "other" },
        ],
        initial_value: "in_player",
        mandatory: true,
        label: "Select Login Type",
        placeholder: "Select login type",
      },
      {
        key: "button_2_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_2_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_2_custom_screen_id",
        type: "text_input",
        initial_value: "",
        label: "Screen ID for Pluin (optional)",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_namespace",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Namespace",
        placeholder: "Custom plugin namespace",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_token_key",
        type: "text_input",
        initial_value: "",
        label: "Custom Plugin Token Key",
        placeholder: "Custom plugin token key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_user_id_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_subscription_price_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_subscription_renews_date_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_custom_user_photo_url_key",
        type: "text_input",
        initial_value: "",
        label: "Custom User ID Key",
        placeholder: "Custom user ID key",
        conditional_fields: [
          {
            condition_value: ["other"],
            key: "styles/button_2_login_type",
          },
        ],
      },
      {
        key: "button_2_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 544,
      },
      {
        key: "button_2_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 27,
      },
      {
        key: "button_2_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 16,
      },
      {
        key: "button_2_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_2_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_2_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_2_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_2_background_color_focused",
        type: "color_picker_rgba",
        label: "Focused Background Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_2_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_2_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#161b29FF",
      },
      {
        key: "button_2_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android"
        label_tooltip: "Font for the toggle title for Android TV",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_2_title_text_font_tvos",
        type: "tvos_font_selector",
        label: "Title Font iOS"
        label_tooltip: "Font for the toggle title for iOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_2_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "button_2_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "button_2_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 29,
      },
    ],
  },
  {
    group: true,
    label: "Info View Styles",
    tooltip: "These fields affect information views",
    folded: true,
    fields: [
      {
        key: "info_label_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#ffffffff",
      },
      {
        key: "info_label_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android TV"
        label_tooltip: "Font for the toggle title for Android TV",
        initial_value: "Roboto-Bold",
      },
      {
        key: "info_label_title_text_font_ios",
        type: "tvos_font_selector",
        label: "Title Font TVOS"
        label_tooltip: "Font for the toggle title for TVOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "info_label_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "info_label_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "info_label_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size for toggle title",
        initial_value: 40,
      },
      {
        key: "info_label_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 24,
      },
      {
        key: "info_label_description_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#161b29B3",
      },
      {
        key: "info_label_description_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android TV"
        label_tooltip: "Font for the toggle title for Android TV",
        initial_value: "Roboto-Bold",
      },
      {
        key: "info_label_description_title_text_font_tvos",
        type: "tvos_font_selector",
        label: "Title Font TVOS"
        label_tooltip: "Font for the toggle title for TVOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "info_label_description_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "info_label_description_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "info_label_description_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 35,
      },
      {
        key: "info_label_description_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 24,
      },
    ],
  },
  {
    group: true,
    label: "Logout Button Styles",
    tooltip: "These fields affect small logout button styles",
    folded: true,
    fields: [
      {
        key: "button_logout_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_background_image_focused",
        type: "uploader",
        label: "Button Focused Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 250,
      },
      {
        key: "button_logout_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 27,
      },
      {
        key: "button_logout_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 13,
      },
      {
        key: "button_logout_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_logout_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "#979797ff",
      },
      {
        key: "button_logout_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_logout_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android TV"
        label_tooltip: "Font for the toggle title for Android TV",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_logout_title_text_font_tvos",
        type: "tvos_font_selector",
        label: "Title Font TVOS"
        label_tooltip: "Font for the toggle title for TVOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_logout_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "button_logout_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "button_logout_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 20,
      },
    ],
  },
  {
    group: true,
    label: "Logout Big Button Styles",
    tooltip: "These fields affect big logout button styles",
    folded: true,
    fields: [
      {
        key: "button_logout_big_background_image",
        type: "uploader",
        label: "Button Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_big_background_image_focused",
        type: "uploader",
        label: "Button Focuserd Background Image",
        placeholder: "Upload a file",
      },
      {
        key: "button_logout_big_radius",
        type: "number_input",
        label: "Button Radius",
        initial_value: 13,
      },
      {
        key: "button_logout_big_width",
        type: "number_input",
        label: "Button Width",
        initial_value: 544,
      },
      {
        key: "button_logout_big_bottom_margin",
        type: "number_input",
        label: "Button Bottom Margin",
        initial_value: 27,
      },
      {
        key: "button_logout_big_border",
        type: "number_input",
        label: "Button Border",
        initial_value: 1,
      },
      {
        key: "button_logout_big_border_color",
        type: "color_picker_rgba",
        label: "Button Border Color",
        initial_value: "#979797ff",
      },
      {
        key: "button_logout_big_border_color_focused",
        type: "color_picker_rgba",
        label: "Button Border Focused Color",
        initial_value: "rgba(255,255,255,1)",
      },
      {
        key: "button_logout_big_background_color",
        type: "color_picker_rgba",
        label: "Background Color",
        label_tooltip: "Background color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_big_background_color_focused",
        type: "color_picker_rgba",
        label: "Background Focused Color",
        label_tooltip: "Background focused color for the toggle component",
        initial_value: "rgba(255,255,255,0)",
      },
      {
        key: "button_logout_big_title_color",
        type: "color_picker_rgba",
        label: "Title Color",
        label_tooltip: "Title color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_big_title_color_focused",
        type: "color_picker_rgba",
        label: "Title Focused Color",
        label_tooltip: "Title focused color for the toggle component",
        initial_value: "#979797FF",
      },
      {
        key: "button_logout_big_title_text_font_android_tv",
        type: "android_font_selector",
        label: "Title Font Android TV"
        label_tooltip: "Font for the toggle title for Android TV",
        initial_value: "Roboto-Bold",
      },
      {
        key: "button_logout_big_title_text_font_tvos",
        type: "tvos_font_selector",
        label: "Title Font TVOS"
        label_tooltip: "Font for the toggle title for TVOS",
        initial_value: "HelveticaNeue-Bold",
      },
      {
        key: "button_logout_big_title_text_font_lg_tv",
        type: "lg_tv_font_selector",
        label: "Title Font LG TV"
        label_tooltip: "Font for the toggle title for LG TV",
        initial_value: "Museo-Bold",
      },
      {
        key: "button_logout_big_title_text_font_samsung_tv",
        type: "samsung_font_selector",
        label: "Title Font Samsung TV"
        label_tooltip: "Font for the toggle title for Samsung TV",
        initial_value: "SamsungOneUI-Bold",
      },
      {
        key: "button_logout_big_title_text_fontsize",
        type: "number_input",
        label: "Font Size"
        label_tooltip: "Font size toggle title",
        initial_value: 29,
      },
    ],
  },
  {
    group: true,
    label: "Debug",
    tooltip: "For development purposes",
    folded: true,
    fields: [
      {
        type: "tag_select",
        key: "debug_dummy_data_source",
        tooltip_text: "Use dummy data source to test UI",
        options: [
          {
            text: "On",
            value: "on",
          },
          {
            text: "Off",
            value: "off",
          },
        ],
        initial_value: "off",
      },
    ],
  },
];

const Localizations = {
  mobile: {
    fields: [...common, ...mobile],
  },
  tv: {
    fields: [...common, ...tv],
  },
};

module.exports = Localizations;
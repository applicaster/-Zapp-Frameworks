import * as R from "ramda";

import { handleStyleType } from "../utils";
import { platformSelect } from "@applicaster/zapp-react-native-utils/reactUtils";

export function valueFromObject({ key, obj, isFocused }) {
  const focusedKey = isFocused ? "_focused" : "";

  let result = null;

  if (isFocused) {
    result = obj?.[`${key}${focusedKey}`];

    if (result) {
      return result;
    }
  }

  result = obj?.[`${key}`];
  console.log({ result, key, obj, isFocused  });
  return result;
}

export function mapLabelKeyToStyle({ key, obj, isFocused = false }) {
  return {
    fontFamily: platformSelect({
      ios: valueFromObject({
        key: `${key}_title_text_font_ios`,
        obj,
        isFocused,
      }),
      android: valueFromObject({
        key: `${key}_title_text_font_android`,
        obj,
        isFocused,
      }),
      tvos: valueFromObject({
        key: `${key}_title_text_font_tvos`,
        obj,
        isFocused,
      }),
      android_tv: valueFromObject({
        key: `${key}_title_text_font_android_tv`,
        obj,
        isFocused,
      }),
      web: valueFromObject({
        key: `${key}_title_text_font_web`,
        obj,
        isFocused,
      }),
      samsung_tv: valueFromObject({
        key: `${key}_title_text_font_samsung_tv`,
        obj,
        isFocused,
      }),
      lg_tv: valueFromObject({
        key: `${key}_title_text_font_lg_tv`,
        obj,
        isFocused,
      }),
    }),
    fontSize: handleStyleType(
      valueFromObject({
        key: `${key}_title_text_fontsize`,
        obj,
        isFocused,
      })
    ),
    color: valueFromObject({ key: `${key}_title_color`, obj, isFocused }),
  };
}

export function mapViewKeyToStyle({ key, obj, isFocused = false }) {
  return {
    backgroundColor: valueFromObject({
      key: `${key}_background_color`,
      obj,
      isFocused,
    }),
    borderRadius: handleStyleType(
      valueFromObject({
        key: `${key}_radius`,
        obj,
        isFocused,
      })
    ),
    borderWidth: handleStyleType(
      valueFromObject({
        key: `${key}_border`,
        obj,
        isFocused,
      })
    ),
    borderColor: valueFromObject({
      key: `${key}_border_color`,
      obj,
      isFocused,
    }),
    marginBottom: handleStyleType(
      valueFromObject({
        key: `${key}_bottom_margin`,
        obj,
        isFocused,
      })
    ),
    width: handleStyleType(
      valueFromObject({
        key: `${key}_width`,
        obj,
        isFocused,
      })
    ),
  };
}

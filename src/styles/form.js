import { spacing, colors, fonts, height, dimensions, width } from "./base"
import { StyleSheet } from 'react-native'


export const boolSelect = {
    height: 100,
    padding: spacing.MEDIUM
}

export const inputView = {
    color: colors.TERTIARY,
    fontWeight: fonts.WEIGHT_LEIGHT,
    width: dimensions.fullWidth * .55,
    minHeight: height.MEDIUM * 0.6,
    borderColor: colors.BORDER,
    borderBottomWidth: 0.7,
    fontSize: fonts.MEDIUM,
    marginRight: spacing.MEDIUM,
    marginTop: spacing.MEDIUM
}

export const formStyle = {
    textbox: {
        normal: {
            ...inputView,
            padding: 5
        },
        error: {

        },
        notEditable: {
            ...inputView,
            opacity: 0.6
        }
    },
    select: {
        normal: {
            ...inputView
        },
    },
    checkbox: {
        normal: {
            ...boolSelect
        }
    },
}


export const form = StyleSheet.create(
    {
        header: {
            marginTop: spacing.MEDIUM,
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.MEDIUM,
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        detailsBox: {
            flexDirection: 'row',
            paddingBottom: spacing.MEDIUM,
            paddingTop: spacing.LARGE,
            borderTopWidth: 0.7,
            borderColor: colors.BORDER,
            paddingLeft: 0,
            justifyContent: 'space-between'
        },
        labelsCol: {
            marginTop: spacing.MEDIUM,
            // paddingTop: spacing.SMALL
        },
        inputBox: {
            borderWidth: 0,
            padding: 0,
            margin: 0
        },
        inputViewLabel: {
            minHeight: height.MEDIUM * 1.2,
            textTransform: 'uppercase',
            paddingTop: spacing.SMALL,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_LEIGHT,
            marginRight: spacing.LARGE,
            fontSize: fonts.SMALL
        }
    });
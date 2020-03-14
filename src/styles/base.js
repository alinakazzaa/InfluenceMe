import { Dimensions } from 'react-native'

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    PRIMARY: 'rgb(26, 69, 244)',
    SECONDARY: 'rgb(223, 32, 220)',
    TERTIARY: 'rgb(83, 75, 98)',
    BLACK: 'rgb(27, 23, 37)',
    WHITE: 'rgb(253, 255, 250)',
    BORDER: 'rgb(228, 226, 233)'
}

export const spacing = {
    SMALL: 5,
    MEDIUM: 10,
    LARGE: 20,
}

export const width = {
    SMALL: 50,
    MEDIUM: 100,
    LARGE: 200,
}

export const height = {
    SMALL: 30,
    MEDIUM: 50,
    LARGE: 80,
}

export const fonts = {
    SMALL: 14,
    MEDIUM: 18,
    LARGE: 20,
    PRIMARY: 'Arial',
    WEIGHT_LIGHT: '200',
    WEIGHT_MEDIUM: '600',
    WEIGHT_HEAVY: '800'
}

// containers

export const container = {
    backgroundColor: colors.WHITE,
}

export const formContainer = {
    borderWidth: 1,
    borderColor: colors.BORDER,
    padding: 30,
    // backgroundColor: colors.WHITE,
    alignItems: 'center',
    borderRadius: 5,
    width: dimensions.fullWidth * .85,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
}


// components

export const input = {
    color: colors.BLACK,
    fontSize: fonts.MEDIUM,
    fontWeight: fonts.WEIGHT_LEIGHT,
    height: height.MEDIUM,
    width: width.LARGE,
    padding: spacing.MEDIUM,
    paddingLeft: spacing.LARGE,
    paddingRight: spacing.LARGE,
    borderRadius: 25,
    borderColor: colors.BLACK,
    borderWidth: 1,
    marginBottom: spacing.SMALL,
}

export const inputLabel = {
    color: colors.BLACK,
    margin: spacing.SMALL,
    marginBottom: spacing.MEDIUM,
    fontSize: fonts.SMALL,
    textTransform: 'uppercase',
    fontWeight: fonts.WEIGHT_LEIGHT
}

export const form = {
    controlLabel: {
        normal: {
            ...inputLabel
        },
        error: {

        }
    },
    textbox: {
        normal: {
            ...input
        },
        error: {

        }
    },
}

// buttons

export const button = {
    backgroundColor: 'transparent',
    padding: spacing.MEDIUM,
    width: width.LARGE,
    borderRadius: 25,
}

export const buttonText = {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: fonts.LARGE,
    textTransform: 'uppercase',
    fontWeight: fonts.WEIGHT_MEDIUM
}
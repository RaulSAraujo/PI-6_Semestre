import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  mode: 'light',
  lightColors: {
    primary: '#F5A623',
    secondary: '#FF7B00',
    warning: '#FFD740',
    error: '#FF5252',
    success: '#66BB6A',
  },
  components: {
    Input: {
      inputContainerStyle: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
      },
      inputStyle: {
        fontSize: 16,
        color: '#37474F',
      },
      errorStyle: {
        fontSize: 15,
        color: '#FF5252',
        fontWeight: 'light',
      },
    },
    ListItemTitle: {
      style: {
        color: '#2196F3',
        fontWeight: 'bold',
      },
    },
    ListItemSubtitle: {
      style: {
        color: 'gray',
        fontWeight: 'light',
      },
    },
  },
});

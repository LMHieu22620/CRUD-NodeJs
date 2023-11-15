import { validate } from '~/utils/validator'
import { checkSchema } from 'express-validator'
import BOOKS_MESSAGE from '~/constants/message'
import { messageIsString, messageName } from '~/utils/customMessage'

export const bookValidator = validate(
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: messageName('Title')
        },
        isString: {
          errorMessage: messageIsString('Title')
        }
      },
      author: {
        notEmpty: {
          errorMessage: messageName('Author')
        },
        isString: {
          errorMessage: messageIsString('Author')
        },
        isLength: {
          options: {
            min: 2,
            max: 50
          },
          errorMessage: BOOKS_MESSAGE.AUTHOR_LENGTH_MUST_BE_FROM_6_TO_50
        }
      },
      publication_date: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          }
        },
        errorMessage: BOOKS_MESSAGE.PUBLICATION_DATE_MUST_BE_ISO8601
      },
      genre: {
        notEmpty: {
          errorMessage: messageName('Genre')
        },
        isString: {
          errorMessage: messageIsString('Genre')
        },
        isLength: {
          options: {
            min: 2,
            max: 50
          },
          errorMessage: BOOKS_MESSAGE.AUTHOR_LENGTH_MUST_BE_FROM_6_TO_50
        }
      },
      language: {
        notEmpty: {
          errorMessage: messageName('Language')
        },
        isString: {
          errorMessage: messageIsString('Language')
        }
      },
      publisher: {
        notEmpty: {
          errorMessage: messageName('Publisher')
        },
        isString: {
          errorMessage: messageIsString('Publisher')
        }
      },
      price: {
        notEmpty: {
          errorMessage: messageName('Price')
        },
        isString: {
          errorMessage: messageIsString('Price')
        }
      },
      description: {
        notEmpty: {
          errorMessage: messageName('Description')
        },
        isString: {
          errorMessage: messageIsString('Description')
        }
      }
    },
    ['body']
  )
)

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';

const server = setupServer(
    rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) => 
        res(
            ctx.json({
                access_token: 'MOCKED_ACCESS_TOKEN',
                expires_in: 3600,
                refresh_token: 'MOCKED_REFRESH_TOKEN',
                token_type: 'bearer',
                user: {
                    id: '7a85649b-db07-44b2-869a-7a029177c208', 
                    aud: 'authenticated', 
                    role: 'authenticated',
                    email: 'demo@demo.demo',
                    email_confirmed_at: '2022-05-06T18:34:36.586713Z',
                    phone: '',
                    confirmed_at: '2022-05-06T18:34:36.586713Z',
                    last_sign_in_at: '2022-05-06T19:48:31.575383558Z',
                    app_metadata: {
                        provider: 'email', 
                        providers: ['email']}
                },
                user_metadata: {},
                identities: [
                    {
                        id: '7a85649b-db07-44b2-869a-7a029177c208', 
                        user_id: '7a85649b-db07-44b2-869a-7a029177c208',
                        identity_data: {
                            sub: '7a85649b-db07-44b2-869a-7a029177c208',
                        },
                        provider: 'email',
                        last_sign_in_at: '2022-05-06T18:34:36.58498Z',
                        created_at: '2022-05-06T18:34:36.585021Z',
                        updated_at: '2022-05-06T18:34:36.585023Z'
                        },
                      ],
                      created_at: '2022-05-06T18:34:36.582817Z',
                      updated_at: '2022-05-06T19:48:31.576461Z',
                    })
            )
        )
    )
    rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 177,
          guest_id: '7a85649b-db07-44b2-869a-7a029177c208',
          content: 'testing\n',
          created_at: '2022-05-06T19:19:36.11587+00:00',
        },
        {
          id: 201,
          guest_id: '7a85649b-db07-44b2-869a-7a029177c208',
          content: 'another one',
          created_at: '2022-05-06T20:44:00.87626+00:00',
        },
        {
          id: 202,
          guest_id: '7a85649b-db07-44b2-869a-7a029177c208',
          content: 'number 3',
          created_at: '2022-05-06T20:44:09.096849+00:00',
        },
      ])
    )
  )

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
    it('renders a list of entries and adds a new entry when a user types one in and hits submit', async () => {
      render(
        <MemoryRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </MemoryRouter>
      );

    //   should render login page because of <PrivateRoute>
    // get email/password inputs & type in values
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    userEvent.type(emailInput, 'demo@demo.demo')
    // userEvent.type(emailInput, 'test@user.email')

    const passwordInput = screen.getByLabelText(/password/i)
    userEvent.type(passwordInput, 'password')
    // userEvent.type(passwordInput, 'mock_password')

    const signInButton = screen.getByRole('button', {  name: /sign in/i})
    userEvent.click(signInButton)

    // const signOutButton = await screen.getByRole('button', {  name: /sign out/i})
    const heading = await screen.getByRole('heading')
    // const heading = await screen.getByRole('heading', {  name: /latest entries:/i})

    expect(heading).toBeInTheDocument()
    })
});

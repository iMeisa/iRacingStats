import os
from dotenv import load_dotenv

load_dotenv()

EXE_NAME = os.getenv("EXE_NAME")


def update():

    print('--- git pull')
    os.system('git pull')

    print('--- building server')
    os.system(f'go build -o {EXE_NAME} server/*.go')

    print('--- building client')
    os.chdir('client')
    os.system('yarn install')
    os.system('yarn build')

    print('--- restarting supervisor')
    os.system(f'sudo supervisorctl restart {EXE_NAME}')


if __name__ == '__main__':
    update()

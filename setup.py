from setuptools import setup, find_packages
import os
import json

VERSION = "0.0.0.6"

with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), "README.MD"), "r") as fh:
    long_description = fh.read()

setup(
    name="anyoneai",
    version=VERSION,
    license='GNU',
    author="Arjun S",
    author_email="arjun.santhoshkumar@gmail.com",
    description="AnyoneAI aims to democratize AI education by providing an intuitive and interactive platform to gain a solid understanding of AI and learn how to solve problems with it. ",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ArjunInventor/anyoneai",
    packages=find_packages(),
    install_requires=[  
          'flask',
          'gevent'
      ],
    include_package_data = True,
    entry_points ={ 
            'console_scripts': [ 
                'anyoneai = anyoneai.labs:main'
            ] 
        }, 
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.5',
)
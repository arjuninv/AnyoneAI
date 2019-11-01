import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="anyoneai",
    version="0.0.0.3",
    license='GNU',
    author="Arjun S",
    author_email="arjun.santhoshkumar@gmail.com",
    description="AnyoneAI aims to democratize AI education by providing an intuitive and interactive platform to gain a solid understanding of AI and learn how to solve problems with it. ",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ArjunInventor/anyoneai",
    packages=setuptools.find_packages(),
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
from distutils.core import setup
from setuptools import find_packages

setup(
    name='django-ajax-comments-xtd',
    version='0.0.1',
    packages=find_packages(),
    license='MIT',
    description='"Django Comments Framework XTD extension app with Ajax commenting support',
    long_description=open('README.md').read(),
    install_requires=[
        'django-comments-xtd>=2.0.8,<2.1'
    ],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Framework :: Django',
        'Natural Language :: English',
    ],
)
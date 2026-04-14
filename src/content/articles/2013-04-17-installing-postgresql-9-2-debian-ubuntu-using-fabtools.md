---
title: "Installing PostgreSQL 9.2 on a Debian/Ubuntu box using fabtools"
date: "2013-04-17"
path: "/articles/installing-postgresql-9-2-debian-ubuntu-using-fabtools/"
tags:
  - "Python"
  - "Fabric"
  - "Fabtools"
  - "Linux"
  - "PostgreSQL"
---

Here is a quick recipe to install the latest stable PostgreSQL version on a server using [fabtools](http://fabtools.readthedocs.org/).

```python
    from fabric.api import task

    import fabtools
    from fabtools import require

    @task
    def postgresql():
        """
        Install the latest stable PostgreSQL version on Debian/Ubuntu
        from the PostgreSQL Global Development Group APT repository

        See: https://wiki.postgresql.org/wiki/Apt
        """

        # Get the distrib codename
        #
        # Note that with fabtools >= 0.14.0 this will be:
        #
        #   distrib = fabtools.system.distrib_codename()
        #
        distrib = fabtools.deb.distrib_codename()

        # Add the PGDG key
        require.file(url='http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc')
        fabtools.deb.add_apt_key('ACCC4CF8.asc', update=False)

        # Add the PGDG repository
        require.deb.source(
            'PGDG',
            'http://apt.postgresql.org/pub/repos/apt/',
            '%s-pgdg' % distrib,
            'main'
        )

        # Install PostgreSQL
        require.postgres.server()
```

_Recipe tested on Ubuntu 12.04 (precise) and Debian 6.0 (squeeze)._

# Shopify Actions

A opinionated set of GitHub Actions to automatically create/push/preview themes on Shopify stores.

These actions are built on top of [Theme Kit](https://shopify.dev/themes/tools/theme-kit), and expects a `config.yml` file to exist in your repository.

## Commands
#### Deploy theme(s)
This action will deploy one or more themes using Theme Kit's `deploy` command.

```yaml
...
- name: Deploy theme
  uses: grafikr/shopify-actions@1.0
  with:
    ACTION: "DEPLOY"
    COMMAND: "--env='*-production' --allow-live"
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
...
```

[Full example](./examples/deploy.yml)

#### Preview theme
This action will create a theme, and add a comment with preview links.

This command will also download any [ignored file](https://shopify.dev/themes/tools/theme-kit/configuration-reference#ignore-patterns]) from the environment specified in the `THEME_KIT_ENVIRONMENT` input.

```yaml
...
- name: Create preview
  uses: grafikr/shopify-actions@1.0
  with:
    ACTION: "PREVIEW"
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
...
```

[Full example](./examples/preview.yml)

#### Delete theme
This action will delete a theme which has been created for preview. This is usually an action you want to use when closing a pull request.

```yaml
...
- name: Create preview
  uses: grafikr/shopify-actions@1.0
  with:
    ACTION: "DELETE"
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
...
```

[Full example](./examples/delete.yml)

## Inputs
| Input                    | Description                                                                                                                                                | Required           | Default     |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|-------------|
| ACTION                   | The action you want to run.                                                                                                                                | :white_check_mark: | -           |
| THEME_KIT_ENVIRONMENT    | The "environment" in your config.yml the action should get it values from.<br/>It will use this to get the token and URL to create/delete a preview theme. | :x:                | development |
| THEME_KIT_DEPLOY_COMMAND | The Theme Kit command you want to use to deploy themes.<br/>E.g. '--env="*-production" --allow-live'.                                                      | :x:                | -           |
| SHOPIFY_THEME_ROLE       | The "role" the preview theme will get.<br/>[Read more about roles](https://shopify.dev/api/admin-rest/2021-10/resources/theme#resource-object)             | :x:                | development |
| GITHUB_TOKEN             | The Github token. Used to create comments.                                                                                                                 | :white_check_mark: | -           |
| BUILD_DIR                | The directory where the project will be build. Should only be changed if you already use this directory.                                                   | :x:                | build       |

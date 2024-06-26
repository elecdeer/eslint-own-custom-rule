import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://example.com/rule/${name}`;
});

export const noHrElementRule = createRule({
  name: "no-hr-element",
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    // fixable: "code",
    docs: {
      description: "Disallow the use of the `<hr>` element.",
    },
    messages: {
      noHrElement: "Do not use the `<hr>` element.",
      replaceWithSolidDivider: "Replace with `<Divider type='solid' />`.",
      replaceWithDashedDivider: "Replace with `<Divider type='dashed' />`.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier) return;
        if (node.name.name !== "hr") return;

        if (!hasDividerStyleClassName(node.attributes)) return;

        context.report({
          node,
          messageId: "noHrElement",
          // fix: (fixer) => fixer.replaceText(node, "<Divider />"),
          suggest: [
            {
              messageId: "replaceWithSolidDivider",
              fix: (fixer) =>
                fixer.replaceText(node, "<Divider type='solid' />"),
            },
            {
              messageId: "replaceWithDashedDivider",
              fix: (fixer) =>
                fixer.replaceText(node, "<Divider type='dashed' />"),
            },
          ],
        });
      },
    };
  },
});

const hasDividerStyleClassName = (
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
) => {
  return attributes.some((attr) => {
    if (attr.type !== AST_NODE_TYPES.JSXAttribute) return false;

    // keyが"className"
    if (attr.name.type !== AST_NODE_TYPES.JSXIdentifier) return false;
    if (attr.name.name !== "className") return false;

    // valueが hoge["divider"]
    if (attr.value?.type !== AST_NODE_TYPES.JSXExpressionContainer)
      return false;
    if (attr.value.expression.type !== AST_NODE_TYPES.MemberExpression)
      return false;
    if (attr.value.expression.property.type !== AST_NODE_TYPES.Literal)
      return false;
    if (attr.value.expression.property.value !== "divider") return false;

    return true;
  });
};

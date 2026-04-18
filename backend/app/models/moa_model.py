import random
from typing import List, Dict

class MockMoAXFormer:
    """
    Mock Transformer model for initial development and testing.
    """
    def __init__(self):
        self.classes = [
            "Kinase inhibitor",
            "DNA synthesis inhibitor",
            "Epigenetic regulator",
            "Metabolic inhibitor",
            "Signal transduction blocker"
        ]

    def predict(self, gene_expression_data: List[float]) -> Dict[str, float]:
        """
        Returns mock probabilities for each MoA class.
        """
        # Simulate processing time
        results = {}
        for cls in self.classes:
            results[cls] = round(random.uniform(0.01, 0.99), 4)
        
        # Normalize roughly (optional for mock)
        return results

    def explain(self, gene_expression_data: List[float]):
        """
        Returns mock attention weights/importance.
        """
        # Mock gene importance for top 10 genes
        importance = []
        for i in range(10):
            importance.append({
                "gene": f"GENE_{i+1}",
                "score": round(random.uniform(0.1, 1.0), 3)
            })
        return importance

model_instance = MockMoAXFormer()

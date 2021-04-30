import os
import joblib

import torch
import torch.nn as nn
import torch.nn.functional as F

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

heart_disease_mdl = os.path.join(THIS_FOLDER, 'heart_disease.mdl')
diabetes_mdl = os.path.join(THIS_FOLDER, 'diabetes_prediction.mdl')
covid_prediction_mdl = os.path.join(THIS_FOLDER, 'covid_model.pt')

HEART_DISEASE_MODEL = joblib.load(heart_disease_mdl)
DIABETES_PREDICTION_MODEL = joblib.load(diabetes_mdl)


def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch
        out = self(images)                # Generate predictions
        loss = F.cross_entropy(out, labels)  # Calculate loss
        return loss

    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                    # Generate predictions
        loss = F.cross_entropy(out, labels)   # Calculate loss
        acc = accuracy(out, labels)           # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}

    def validation_epoch_end(self, outputs):
        batch_losses = [x['val_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()   # Combine losses
        batch_accs = [x['val_acc'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()      # Combine accuracies
        return {'val_loss': epoch_loss.item(), 'val_acc': epoch_acc.item()}

    def epoch_end(self, epoch, result):
        print("Epoch [{}], train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['train_loss'], result['val_loss'], result['val_acc']))


class CnnModel(ImageClassificationBase):
    def __init__(self):
        super().__init__()
        self.network = nn.Sequential(

            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            # 16 x 180 x 180
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # output: 16 x 90 x 90

            nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1),
            # 32 x 90 x 90
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # output: 32 x 45 x 45

            nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1),
            # 64 x 45 x 45
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # output: 64 x 22 x 22

            nn.Dropout(0.2),

            nn.Flatten(),

            nn.Linear(64*22*22, 128),

            nn.ReLU(),

            nn.Linear(128, 3))

    def forward(self, xb):
        return self.network(xb)


COVID_PREDICTION_MODEL = CnnModel()

device = torch.device('cpu')
COVID_PREDICTION_MODEL.load_state_dict(
    torch.load(covid_prediction_mdl, map_location=device))
COVID_PREDICTION_MODEL.eval()
